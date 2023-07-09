import { Message, WebSocketMessage } from '../../interfaces';

export const messageTypes = ['MESSAGE_CREATED', 'MESSAGE_CREATED', 'MESSAGE_DELETED'];

export const messageCreated = (message: Message, threadId: string): WebSocketMessage => ({
  type: 'MESSAGE_CREATED',
  payload: {
    message,
    threadId,
  },
});

export const messageUpdated = (message: Message, threadId: string): WebSocketMessage => ({
  type: 'MESSAGE_UPDATED',
  payload: {
    message,
    threadId,
  },
});

export const messageDeleted = (messageId: string, threadId: string): WebSocketMessage => ({
  type: 'MESSAGE_DELETED',
  payload: {
    messageId,
    threadId,
  },
});
