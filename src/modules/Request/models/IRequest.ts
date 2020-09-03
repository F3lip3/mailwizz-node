import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IRequest {
  get<T = any, R = IMailWizzResponse<T>>(url: string, params?: any): Promise<R>;
  delete(url: string): Promise<IMailWizzEmptyResponse>;
  post<T = any, R = IMailWizzResponse<T>>(url: string, data?: any): Promise<R>;
  put<T = any, R = IMailWizzResponse<T>>(url: string, data?: any): Promise<R>;
}
