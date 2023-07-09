import axios, { AxiosStatic } from 'axios';

import { mockCreateMessage, mockMessage, mockThread } from '../mocks';
import { AppApi } from './app';
import { AppEndpoint } from './utils';

describe('AppApi', () => {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>;
  const appApi = new AppApi('auth');

  it('getThreads', async () => {
    mockedAxios.get.mockResolvedValueOnce([mockThread]);

    const threads = await appApi.getThreads();
    expect(mockedAxios.get).toHaveBeenCalledWith(AppEndpoint.getThreads().toString(), undefined);
    expect(threads).toEqual([mockThread]);
  });

  it('getThread', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockThread);

    const thread = await appApi.getThread(mockThread.id);
    expect(mockedAxios.get).toHaveBeenCalledWith(AppEndpoint.getThread(mockThread.id).toString(), undefined);
    expect(thread).toEqual(mockThread);
  });

  it('createThread', async () => {
    const title = 'title';
    mockedAxios.post.mockResolvedValueOnce(mockThread);

    const thread = await appApi.createThread(title);
    expect(mockedAxios.post).toHaveBeenCalledWith(AppEndpoint.createThread().toString(), { title }, undefined);
    expect(thread).toEqual(mockThread);
  });

  it('updateThread', async () => {
    const title = 'edited';
    const resultThread = { ...mockThread, title };
    mockedAxios.patch.mockResolvedValueOnce(resultThread);

    const thread = await appApi.updateThread(mockThread.id, title);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      AppEndpoint.updateThread(mockThread.id).toString(),
      { title },
      undefined,
    );
    expect(thread).toEqual(resultThread);
  });

  it('deleteThread', async () => {
    mockedAxios.delete.mockResolvedValueOnce(true);

    const result = await appApi.deleteThread(mockMessage.id);
    expect(mockedAxios.delete).toHaveBeenCalledWith(AppEndpoint.deleteThread(mockThread.id).toString(), undefined);
    expect(result).toBe(true);
  });

  it('createMessage', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockMessage);

    const message = await appApi.createMessage(mockCreateMessage);
    expect(mockedAxios.post).toHaveBeenCalledWith(AppEndpoint.createMessage().toString(), mockCreateMessage, undefined);
    expect(message).toEqual({
      ...mockMessage,
      checkSum: 'auth',
    });
  });

  it('updateMessage', async () => {
    const text = 'edited';
    const resultMessage = { ...mockMessage, text };
    mockedAxios.patch.mockResolvedValueOnce(resultMessage);

    const message = await appApi.updateMessage(mockMessage.id, text);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      AppEndpoint.updateMessage(mockMessage.id).toString(),
      { text },
      undefined,
    );
    expect(message).toEqual({
      ...resultMessage,
      checkSum: 'auth',
    });
  });

  it('deleteMessage', async () => {
    mockedAxios.delete.mockResolvedValueOnce(true);

    const result = await appApi.deleteMessage(mockMessage.id);
    expect(mockedAxios.delete).toHaveBeenCalledWith(AppEndpoint.deleteMessage(mockMessage.id).toString(), undefined);
    expect(result).toBe(true);
  });
});
