import { CreateMessage, Message } from '../interfaces';

export const mockMessage: Message = {
  id: 'id',
  text: 'text',
  userId: 'userId',
  displayName: 'displayName',
  checkSum: 'checkSum',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
};

export const mockCreateMessage: CreateMessage = {
  text: 'text',
  threadId: 'threadId',
  displayName: 'displayName',
  checkSum: 'checkSum',
};
