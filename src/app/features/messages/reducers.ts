import { formatISO } from 'date-fns';

import { MessageList, WebSocketMessage } from '../../interfaces';

const initialState: MessageList = {};

export const messagesReducer = (state: MessageList = initialState, action: WebSocketMessage): MessageList => {
  switch (action.type) {
    case 'MESSAGE_CREATED':
      return {
        ...state,
        [action.payload.threadId]: [...(state[action.payload.threadId] ?? []), action.payload.message],
      };
    case 'MESSAGE_UPDATED':
      return {
        ...state,
        [action.payload.threadId]: (state[action.payload.threadId] ?? []).map((it) =>
          it.id === action.payload.message.id ? action.payload.message : it,
        ),
      };
    case 'MESSAGE_DELETED':
      return {
        ...state,
        [action.payload.threadId]: (state[action.payload.threadId] ?? []).map((it) =>
          it.id === action.payload.messageId
            ? {
                ...it,
                deletedAt: formatISO(Date.now()),
              }
            : it,
        ),
      };
    default:
      return state;
  }
};
