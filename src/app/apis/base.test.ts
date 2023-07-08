import axios, { AxiosStatic } from 'axios';

import { BaseApi } from './base';

describe('BaseApi', () => {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>;
  const baseApi = new BaseApi();
  const url = new URL('http://localhost');

  it('delete', async () => {
    mockedAxios.delete.mockImplementation();

    await baseApi.delete(url);
    expect(mockedAxios.delete).toHaveBeenCalledWith(url.toString(), undefined);
  });

  it('get', async () => {
    const value = {};
    mockedAxios.get.mockResolvedValueOnce(value);

    const response = await baseApi.get(url);
    expect(mockedAxios.get).toHaveBeenCalledWith(url.toString(), undefined);
    expect(response).toEqual(value);
  });

  it('post', async () => {
    const payload = {};
    mockedAxios.post.mockImplementation();

    await baseApi.post(url, payload);
    expect(mockedAxios.post).toHaveBeenCalledWith(url.toString(), payload, undefined);
  });
});
