import { createAction } from '@reduxjs/toolkit';

import { Message } from '../../interfaces';

export const messagesReceived = createAction<{ messages: Message[]; threadId: string }>('MESSAGES_RECEIVED');
export const messageCreated = createAction<{ message: Message; threadId: string }>('MESSAGE_CREATED');
export const messageUpdated = createAction<{ message: Message; threadId: string }>('MESSAGE_UPDATED');
export const messageDeleted = createAction<{ message: Message; threadId: string }>('MESSAGE_DELETED');
