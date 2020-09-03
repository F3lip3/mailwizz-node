import {
  IMailWizzEmptyResponse,
  IMailWizzResponse,
  IMailWizzSingleResponse
} from '@modules/MailWizz/entities/IMailWizzResponse';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IRequest {
  get<T = any, R = IMailWizzResponse<T> | IMailWizzSingleResponse<T>>(
    url: string,
    params?: any
  ): Promise<R>;
  delete(url: string): Promise<IMailWizzEmptyResponse>;
  post<T = any, R = IMailWizzResponse<T> | IMailWizzSingleResponse<T>>(
    url: string,
    data?: any
  ): Promise<R>;
  put<T = any, R = IMailWizzResponse<T> | IMailWizzSingleResponse<T>>(
    url: string,
    data?: any
  ): Promise<R>;
}
