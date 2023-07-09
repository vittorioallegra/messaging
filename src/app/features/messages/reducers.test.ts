import { getType } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';

import { mockMessage, mockThread } from '../../mocks';
import * as actions from './actions';
import { messagesReducer } from './reducers';

describe('Messages Reducer', () => {
  it(`${getType(actions.messagesReceived)}`, () => {
    const state = {};
    expect(
      messagesReducer(state, actions.messagesReceived({ messages: [mockMessage], threadId: mockThread.id })),
    ).toEqual({
      ...state,
      [mockThread.id]: [mockMessage],
    });
  });

  it(`${getType(actions.messageCreated)}`, () => {
    const state = {};
    expect(messagesReducer(state, actions.messageCreated({ message: mockMessage, threadId: mockThread.id }))).toEqual({
      ...state,
      [mockThread.id]: [mockMessage],
    });
  });

  it(`${getType(actions.messageUpdated)}`, () => {
    const state = {
      [mockThread.id]: [mockMessage],
    };
    const messageUpdated = {
      ...mockMessage,
      updatedAt: formatISO(Date.now()),
    };
    expect(
      messagesReducer(state, actions.messageUpdated({ message: messageUpdated, threadId: mockThread.id })),
    ).toEqual({
      ...state,
      [mockThread.id]: [messageUpdated],
    });
  });

  it(`${getType(actions.messageDeleted)}`, () => {
    const state = {
      [mockThread.id]: [mockMessage],
    };
    const messageDeleted = {
      ...mockMessage,
      text: 'common.message.deleted',
      updatedAt: formatISO(Date.now()),
    };
    expect(
      messagesReducer(state, actions.messageDeleted({ message: messageDeleted, threadId: mockThread.id })),
    ).toEqual({
      ...state,
      [mockThread.id]: [messageDeleted],
    });
  });
});
