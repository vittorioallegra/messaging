import { formatISO } from 'date-fns';
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { Message, MessageList, WebSocketMessage, WebSocketSubscription } from '../interfaces';
import { createUseContext } from '../utils';

// properties that provides this context
interface WebSocketContextProps {
  messages: Message[];
  threadId?: string;
  connect: (threadId: string) => void;
  updateMessage: (message: Message) => void;
  deleteMessage: (id: string) => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<null | WebSocketContextProps>(null);
WebSocketContext.displayName = 'WebSocket Context';

type WebSocketProviderProps = PropsWithChildren<{
  authorization: string;
}>;

function websocketReducer(state: MessageList, action: WebSocketMessage | undefined): MessageList {
  if (action) {
    switch (action.type) {
      case 'MESSAGE_CREATED':
        return {
          ...state,
          [action.payload.threadId]: [...(state[action.payload.threadId] ?? []), action.payload.message],
        };
      case 'MESSAGE_UPDATED':
        return {
          ...state,
          [action.payload.threadId]: (state[action.payload.threadId] ?? []).map((it) =>
            it.id === action.payload.message.id ? action.payload.message : it,
          ),
        };
      case 'MESSAGE_DELETED':
        return {
          ...state,
          [action.payload.threadId]: (state[action.payload.threadId] ?? []).map((it) =>
            it.id === action.payload.messageId
              ? {
                  ...it,
                  deletedAt: formatISO(Date.now()),
                }
              : it,
          ),
        };
    }
  } else {
    return {};
  }
}

export const WebSocketProvider = ({ authorization, children }: WebSocketProviderProps) => {
  const [websocket, setWebSocket] = useState<WebSocket | undefined>(undefined);
  const [messageList, dispatch] = useReducer(websocketReducer, {}, () => {
    const messages = localStorage.getItem('messages');
    if (messages) {
      return JSON.parse(messages);
    }
    return {};
  });
  const [threadId, setThreadId] = useState<string | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messageList));
  }, [messageList]);

  const messages = useMemo(() => {
    if (threadId && messageList[threadId]) {
      return messageList[threadId].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }
    return [];
  }, [messageList, threadId]);

  const disconnect = useCallback(() => {
    if (websocket) {
      websocket.close();
      setWebSocket(undefined);
      setThreadId(undefined);
    }
  }, [websocket]);

  const connect = useCallback(
    (threadId: string) => {
      disconnect();
      const socket = new WebSocket('ws://confi-codin-1xbkniq7crrwz-645813469.us-west-2.elb.amazonaws.com/ws');
      socket.onopen = () => {
        const websocketSubscription: WebSocketSubscription = {
          type: 'THREAD_SUBSCRIPTION',
          payload: {
            authorization,
            threadId,
          },
        };
        socket.send(JSON.stringify(websocketSubscription));
      };
      socket.onmessage = (event) => {
        const message: WebSocketMessage = JSON.parse(event.data);
        if (['MESSAGE_CREATED', 'MESSAGE_UPDATED', 'MESSAGE_DELETED'].includes(message.type)) {
          dispatch(message);
        }
      };
      setWebSocket(socket);
      setThreadId(threadId);
    },
    [authorization, disconnect, dispatch],
  );

  const updateMessage = useCallback(
    (message: Message) => {
      if (threadId) {
        const websocketMessage: WebSocketMessage = {
          type: 'MESSAGE_UPDATED',
          payload: {
            message,
            threadId,
          },
        };
        dispatch(websocketMessage);
        if (websocket) {
          websocket.send(JSON.stringify(websocketMessage));
        }
      }
    },
    [threadId, dispatch, websocket],
  );

  const deleteMessage = useCallback(
    (messageId: string) => {
      if (threadId) {
        const websocketMessage: WebSocketMessage = {
          type: 'MESSAGE_DELETED',
          payload: {
            messageId,
            threadId,
          },
        };
        dispatch(websocketMessage);
        if (websocket) {
          websocket.send(JSON.stringify(websocketMessage));
        }
      }
    },
    [threadId, dispatch, websocket],
  );

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        threadId,
        connect,
        updateMessage,
        deleteMessage,
        disconnect,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = createUseContext(WebSocketContext);
