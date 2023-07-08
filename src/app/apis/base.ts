import axios, { AxiosInstance } from 'axios';

export interface IBaseApiProps {
  headers?: { [key: string]: string };
}

export class BaseApi {
  private client: AxiosInstance;

  constructor(auth?: string) {
    const headers = {
      'Content-Type': 'application/json',
      ...(auth
        ? {
            Authorization: auth,
          }
        : {}),
    };
    const validateStatus = (status: number) => status >= 200 && status <= 299;

    const instance = axios.create({ headers, validateStatus });

    instance.interceptors.response.use(
      (response) => Promise.resolve(response.data),
      (error) => {
        const { response } = error;

        if (response.status === 401) {
          console.error('Unauthorized');
        }

        return Promise.reject(error);
      },
    );

    this.client = instance;
  }

  delete = <T>(url: URL, options?: IBaseApiProps): Promise<T> => {
    return this.client.delete(url.toString(), options);
  };

  get = <T>(url: URL, options?: IBaseApiProps): Promise<T> => {
    return this.client.get(url.toString(), options);
  };

  post = <T>(url: URL, data: unknown, options?: IBaseApiProps): Promise<T> => {
    return this.client.post(url.toString(), data, options);
  };

  patch = <T>(url: URL, data: unknown, options?: IBaseApiProps): Promise<T> => {
    return this.client.patch(url.toString(), data, options);
  };
}
