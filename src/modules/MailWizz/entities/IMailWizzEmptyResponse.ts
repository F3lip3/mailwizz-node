import IMailWizzGenericError from './IMailWizzGenericError';

export default interface IMailWizzEmptyResponse {
  status: number;
  statusText: string;
  error?: string | IMailWizzGenericError;
}
