import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { messageDeleted, messageUpdated, messagesReceived, messagesReducer, selectMessages } from '../features';
import { Message, MessageList, WebSocketMessage, WebSocketSubscription } from '../interfaces';
import { Store, createUseContext } from '../utils';

// properties that provides this context
interface WebSocketContextProps {
  messages: Message[];
  threadId?: string;
  connect: (threadId: string) => void;
  receivedMessages: (messages: Message[], threadId: string) => void;
  updateMessage: (message: Message) => void;
  deleteMessage: (message: Message) => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<null | WebSocketContextProps>(null);
WebSocketContext.displayName = 'WebSocket Context';

type WebSocketProviderProps = PropsWithChildren<{
  authorization: string;
}>;

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [store] = useState(new Store<MessageList>('messages'));
  const [websocket, setWebSocket] = useState<WebSocket | undefined>(undefined);
  const [messageList, dispatch] = useReducer(messagesReducer, {}, () => store.getItem() ?? {});
  const [threadId, setThreadId] = useState<string | undefined>(undefined);

  useEffect(() => {
    store.setItem(messageList);
    // eslint-disable-next-line
  }, [messageList]);

  const messages = useMemo(() => selectMessages(messageList, threadId), [messageList, threadId]);

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
            authorization: 'a96f26a2-bdf1-47f0-a654-0cf528d1cf91',
            threadId,
          },
        };
        socket.send(JSON.stringify(websocketSubscription));
      };
      socket.onmessage = (event) => {
        const message: WebSocketMessage = JSON.parse(event.data);
        if (message.type === 'MESSAGE_CREATED') {
          dispatch(message);
        }
      };
      setWebSocket(socket);
      setThreadId(threadId);
    },
    [disconnect, dispatch],
  );

  const receivedMessages = useCallback((messages: Message[], threadId: string) => {
    dispatch(messagesReceived({ messages, threadId }));
  }, []);

  const updateMessage = useCallback(
    (message: Message) => {
      if (threadId) {
        const websocketMessage = messageUpdated({ message, threadId });
        dispatch(websocketMessage);
      }
    },
    [threadId, dispatch],
  );

  const deleteMessage = useCallback(
    (message: Message) => {
      if (threadId) {
        const websocketMessage = messageDeleted({ message, threadId });
        dispatch(websocketMessage);
      }
    },
    [threadId, dispatch],
  );

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        threadId,
        connect,
        receivedMessages,
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
