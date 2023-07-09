import axios, { AxiosStatic } from 'axios';

import { mockUser } from '../mocks';
import { AuthApi } from './auth';
import { AuthEndpoint } from './utils';

describe('AuthApi', () => {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>;
  const appApi = new AuthApi();

  it('login', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockUser);

    const user = await appApi.login(mockUser.email);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      AuthEndpoint.login().toString(),
      {
        email: mockUser.email,
      },
      undefined,
    );
    expect(user).toEqual(mockUser);
  });
});
