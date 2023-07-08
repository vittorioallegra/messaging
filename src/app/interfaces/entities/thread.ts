import { Message } from './message';
import { User } from './user';

export interface Thread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  messages: Message[];
  createdBy: User;
}
