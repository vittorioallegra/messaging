import { CreateMessage, Message, Thread } from '../interfaces';
import { BaseApi } from './base';
import { AppEndpoint } from './utils';

export class AppApi extends BaseApi {
  private userId: string;

  constructor(userId: string) {
    super('0de37435-b9ea-4f67-b25a-a879846fa27d');
    this.userId = userId;
  }

  getThreads = (): Promise<Thread[]> => {
    return this.get(AppEndpoint.getThreads());
  };

  getThread = (id: string): Promise<Thread> => {
    return this.get(AppEndpoint.getThread(id));
  };

  createThread = (title: string): Promise<Thread> => {
    return this.post(AppEndpoint.createThread(), { title });
  };

  updateThread = (id: string, title: string): Promise<Thread> => {
    return this.patch(AppEndpoint.updateThread(id), { title });
  };

  deleteThread = (id: string): Promise<boolean> => {
    return this.delete(AppEndpoint.deleteThread(id));
  };

  createMessage = async (body: CreateMessage): Promise<Message> => {
    try {
      const message: Message = await this.post(AppEndpoint.createMessage(), body);
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
      const message: Message = await this.patch(AppEndpoint.updateMessage(id), { text });
      return Promise.resolve({
        ...message,
        checkSum: this.userId,
      });
    } catch {
      return Promise.reject();
    }
  };

  deleteMessage = (id: string): Promise<boolean> => {
    return this.delete(AppEndpoint.deleteMessage(id));
  };
}
