import { CreateMessage, Message, Thread } from '../interfaces';
import { BaseApi } from './base';
import { AppEndpoint } from './utils';

export class AppApi extends BaseApi {
  private userId: string;

  constructor(userId: string) {
    super('a96f26a2-bdf1-47f0-a654-0cf528d1cf91');
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
    return this.post(AppEndpoint.createMessage(), body);
  };

  updateMessage = async (id: string, text: string): Promise<Message> => {
    return this.patch(AppEndpoint.updateMessage(id), { text });
  };

  deleteMessage = (id: string): Promise<Message> => {
    return this.patch(AppEndpoint.updateMessage(id), { text: 'common.message.deleted' });
  };
}
