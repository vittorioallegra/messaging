import { Message, MessageList } from '../../interfaces';

export const selectMessages = (state: MessageList, threadId?: string): Message[] => {
  if (threadId && threadId in state) {
    return [...state[threadId]].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }
  return [];
};
