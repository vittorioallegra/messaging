import { formatISO } from 'date-fns';

import { mockMessage, mockThread } from '../../mocks';
import * as actions from './actions';
import { messagesReducer } from './reducers';

describe('Messages Reducer', () => {
  it('MESSAGE_CREATED', () => {
    const state = {};
    expect(messagesReducer(state, actions.messageCreated(mockMessage, mockThread.id))).toEqual({
      ...state,
      [mockThread.id]: [mockMessage],
    });
  });

  it('MESSAGE_UPDATED', () => {
    const state = {
      [mockThread.id]: [mockMessage],
    };
    const messageUpdated = {
      ...mockMessage,
      updatedAt: formatISO(Date.now()),
    };
    expect(messagesReducer(state, actions.messageUpdated(messageUpdated, mockThread.id))).toEqual({
      ...state,
      [mockThread.id]: [messageUpdated],
    });
  });

  it('MESSAGE_DELETED', () => {
    const state = {
      [mockThread.id]: [mockMessage],
    };
    expect(messagesReducer(state, actions.messageDeleted(mockMessage.id, mockThread.id))).toEqual({
      ...state,
      [mockThread.id]: [
        {
          ...mockMessage,
          deletedAt: formatISO(Date.now()),
        },
      ],
    });
  });
});
