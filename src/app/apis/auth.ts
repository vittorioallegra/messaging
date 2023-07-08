import { User } from '../interfaces';
import { BaseApi } from './base';
import { ApiEndpoint } from './utils';

export class AuthApi extends BaseApi {
  login = (email: string): Promise<User> => {
    return this.post(ApiEndpoint.login(), { email });
  };
}
