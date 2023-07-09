import { mockMessage, mockThread } from '../../mocks';
import * as actions from './actions';

describe('Messages Actions', () => {
  it('MESSAGE_CREATED', () => {
    expect(actions.messageCreated(mockMessage, mockThread.id)).toEqual({
      type: 'MESSAGE_CREATED',
      payload: { message: mockMessage, threadId: mockThread.id },
    });
  });

  it('MESSAGE_UPDATED', () => {
    expect(actions.messageUpdated(mockMessage, mockThread.id)).toEqual({
      type: 'MESSAGE_UPDATED',
      payload: { message: mockMessage, threadId: mockThread.id },
    });
  });

  it('MESSAGE_DELETED', () => {
    expect(actions.messageDeleted(mockMessage.id, mockThread.id)).toEqual({
      type: 'MESSAGE_DELETED',
      payload: { messageId: mockMessage.id, threadId: mockThread.id },
    });
  });
});
