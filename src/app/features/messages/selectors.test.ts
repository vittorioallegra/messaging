import { mockMessage, mockThread } from '../../mocks';
import { selectMessages } from './selectors';

describe('Messages Selectors', () => {
  it('selectMessages', () => {
    const state = {
      [mockThread.id]: [mockMessage],
    };
    expect(selectMessages(state, mockThread.id)).toEqual([mockMessage]);
  });
});
