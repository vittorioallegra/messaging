import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { messageDeleted, messageTypes, messageUpdated, messagesReducer, selectMessages } from '../features';
import { Message, MessageList, WebSocketMessage, WebSocketSubscription } from '../interfaces';
import { Store, createUseContext } from '../utils';

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

export const WebSocketProvider = ({ authorization, children }: WebSocketProviderProps) => {
  const [store] = useState(new Store<MessageList>('messages'));
  const [websocket, setWebSocket] = useState<WebSocket | undefined>(undefined);
  const [messageList, dispatch] = useReducer(messagesReducer, {}, () => store.getItem() ?? {});
  const [threadId, setThreadId] = useState<string | undefined>(undefined);

  useEffect(() => {
    store.setItem(messageList);
    // eslint-disable-next-line
  }, [messageList]);

  const messages = useMemo(() => {
    return selectMessages(messageList, threadId);
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
        if (messageTypes.includes(message.type)) {
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
        const websocketMessage = messageUpdated(message, threadId);
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
        const websocketMessage = messageDeleted(messageId, threadId);
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
