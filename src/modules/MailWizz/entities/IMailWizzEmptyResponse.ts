import IMailWizzGenericError from './IMailWizzGenericError';

export default interface IMailWizzEmptyResponse {
  status: string;
  error?: string | IMailWizzGenericError;
}
