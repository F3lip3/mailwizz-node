import IMailWizzGenericError from './IMailWizzGenericError';

export default interface IMailWizzEmptyResponse {
  status: number | string;
  statusText: string;
  error?: string | IMailWizzGenericError;
}
