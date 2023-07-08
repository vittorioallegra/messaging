export interface Message {
  id: string;
  text: string;
  userId: string;
  displayName: string;
  checkSum: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateMessage {
  text: string;
  threadId: string;
  displayName: string;
  checkSum: string;
}

export interface MessageList {
  [threadId: string]: Message[];
}
