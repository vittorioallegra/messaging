import { Message } from './message';

export interface WebSocketSubscription {
  type: 'THREAD_SUBSCRIPTION';
  payload: {
    authorization: string;
    threadId: string;
  };
}

export interface WebSocketMessage {
  type: 'MESSAGE_CREATED';
  payload: {
    threadId: string;
    message: Message;
  };
}
