import { CreateMessage, Message, Thread } from '../interfaces';
import { BaseApi } from './base';
import { ApiEndpoint } from './utils';

export class AppApi extends BaseApi {
  private userId: string;

  constructor(userId: string) {
    super('0de37435-b9ea-4f67-b25a-a879846fa27d');
    this.userId = userId;
  }

  getThreads = (): Promise<Thread[]> => {
    return this.get(ApiEndpoint.getThreads());
  };

  getThread = (id: string): Promise<Thread> => {
    return this.get(ApiEndpoint.getThread(id));
  };

  createThread = (title: string): Promise<Thread> => {
    return this.post(ApiEndpoint.createThread(), { title });
  };

  updateThread = (id: string, title: string): Promise<Thread> => {
    return this.patch(ApiEndpoint.updateThread(id), { title });
  };

  deleteThread = (id: string): Promise<boolean> => {
    return this.delete(ApiEndpoint.deleteThread(id));
  };

  createMessage = async (body: CreateMessage): Promise<Message> => {
    try {
      const message: Message = await this.post(ApiEndpoint.createMessage(), body);
      return Promise.resolve({
        ...message,
        checkSum: this.userId,
      });
    } catch {
      return Promise.reject();
    }
  };

  updateMessage = async (id: string, text: string): Promise<Message> => {
    try {
      const message: Message = await this.patch(ApiEndpoint.updateMessage(id), { text });
      return Promise.resolve({
        ...message,
        checkSum: this.userId,
      });
    } catch {
      return Promise.reject();
    }
  };

  deleteMessage = (id: string): Promise<boolean> => {
    return this.delete(ApiEndpoint.deleteMessage(id));
  };
}
