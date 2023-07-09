import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { messageDeleted, messageUpdated, messagesReceived, messagesReducer, selectMessages } from '../features';
import { Message, MessageList, User, WebSocketMessage, WebSocketSubscription } from '../interfaces';
import { Store, createUseContext } from '../utils';

interface MessagesContextProps {
  messages: Message[];
  threadId?: string;
  connect: (threadId: string) => void;
  colorForMessage: (message: Message) => string;
  receivedMessages: (messages: Message[], threadId: string) => void;
  updateMessage: (message: Message) => void;
  deleteMessage: (message: Message) => void;
  disconnect: () => void;
}

const MessagesContext = createContext<null | MessagesContextProps>(null);
MessagesContext.displayName = 'Messages Context';

export const MessagesProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(new Store<MessageList>('messages'));
  const [websocket, setWebSocket] = useState<WebSocket | undefined>(undefined);
  const [messageList, dispatch] = useReducer(messagesReducer, {}, () => store.getItem() ?? {});
  const [threadId, setThreadId] = useState<string | undefined>(undefined);
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    store.setItem(messageList);
    // eslint-disable-next-line
  }, [messageList]);

  const messages = useMemo(() => {
    const messages = selectMessages(messageList, threadId);
    messages.forEach(({ displayName }) => {
      const { id }: User = JSON.parse(displayName);
      if (!(id in userColors)) {
        setUserColors((userColors) => ({
          ...userColors,
          [id]: '#' + ('000000' + ((Math.random() * 0xffffff) << 0).toString(16)).slice(-6),
        }));
      }
    });
    return messages;
  }, [messageList, threadId, userColors]);

  const colorForMessage = useCallback(
    (message: Message) => {
      const { id }: User = JSON.parse(message.displayName);
      return userColors[id];
    },
    [userColors],
  );

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
    <MessagesContext.Provider
      value={{
        messages,
        threadId,
        connect,
        colorForMessage,
        receivedMessages,
        updateMessage,
        deleteMessage,
        disconnect,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = createUseContext(MessagesContext);
