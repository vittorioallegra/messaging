import { Thread } from '../interfaces';
import { mockMessage } from './message';
import { mockUser } from './user';

export const mockThread: Thread = {
  id: 'id',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  messages: [mockMessage],
  createdBy: mockUser,
};
