import { getType } from '@reduxjs/toolkit';

import { mockMessage, mockThread } from '../../mocks';
import * as actions from './actions';

describe('Messages Actions', () => {
  it(`${getType(actions.messagesReceived)}`, () => {
    expect(actions.messagesReceived({ messages: [mockMessage], threadId: mockThread.id })).toEqual({
      type: getType(actions.messagesReceived),
      payload: { messages: [mockMessage], threadId: mockThread.id },
    });
  });

  it(`${getType(actions.messageCreated)}`, () => {
    expect(actions.messageCreated({ message: mockMessage, threadId: mockThread.id })).toEqual({
      type: getType(actions.messageCreated),
      payload: { message: mockMessage, threadId: mockThread.id },
    });
  });

  it(`${getType(actions.messageUpdated)}`, () => {
    expect(actions.messageUpdated({ message: mockMessage, threadId: mockThread.id })).toEqual({
      type: getType(actions.messageUpdated),
      payload: { message: mockMessage, threadId: mockThread.id },
    });
  });

  it(`${getType(actions.messageDeleted)}`, () => {
    expect(actions.messageDeleted({ message: mockMessage, threadId: mockThread.id })).toEqual({
      type: getType(actions.messageDeleted),
      payload: { message: mockMessage, threadId: mockThread.id },
    });
  });
});
