import { Message } from './message';

export interface WebSocketSubscription {
  type: 'THREAD_SUBSCRIPTION';
  payload: {
    authorization: string;
    threadId: string;
  };
}

interface WebSocketMessageCreatePayload {
  threadId: string;
  message: Message;
}

interface WebSocketMessageUpdatePayload {
  threadId: string;
  message: Message;
}

interface WebSocketMessageDeletePayload {
  threadId: string;
  messageId: string;
}

export type WebSocketMessage =
  | {
      type: 'MESSAGE_CREATED';
      payload: WebSocketMessageCreatePayload;
    }
  | {
      type: 'MESSAGE_UPDATED';
      payload: WebSocketMessageUpdatePayload;
    }
  | {
      type: 'MESSAGE_DELETED';
      payload: WebSocketMessageDeletePayload;
    };
