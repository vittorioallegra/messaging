import { createReducer } from '@reduxjs/toolkit';

import { MessageList } from '../../interfaces';
import * as actions from './actions';

const initialState: MessageList = {};

export const messagesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.messagesReceived, (state, action) => {
      const { messages, threadId } = action.payload;
      const currentMessages = state[threadId] ?? [];
      const messageIds = currentMessages.map(({ id }) => id);
      const newMessages = messages.filter(({ id }) => !messageIds.includes(id));
      state[threadId] = [
        ...currentMessages.map((it) => {
          const message = messages.find(({ id }) => id === it.id);
          return message ?? it;
        }),
        ...newMessages,
      ];
    })
    .addCase(actions.messageCreated, (state, action) => {
      const { message, threadId } = action.payload;
      state[threadId] = [...(state[threadId] ?? []), message];
    })
    .addCase(actions.messageUpdated, (state, action) => {
      const { message, threadId } = action.payload;
      state[threadId] = (state[threadId] ?? []).map((it) => (it.id === message.id ? message : it));
    })
    .addCase(actions.messageDeleted, (state, action) => {
      const { message, threadId } = action.payload;
      state[threadId] = (state[threadId] ?? []).map((it) => (it.id === message.id ? message : it));
    });
});
