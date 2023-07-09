import { User } from '../interfaces';
import { BaseApi } from './base';
import { AuthEndpoint } from './utils';

export class AuthApi extends BaseApi {
  login = (email: string): Promise<User> => {
    return this.post(AuthEndpoint.login(), { email });
  };
}
