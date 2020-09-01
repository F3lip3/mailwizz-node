import IMailWizzGenericError from './IMailWizzGenericError';

export default interface IMailWizzResponse<T> {
  status: string;
  error?: string | IMailWizzGenericError;
  data?: {
    count?: string;
    total_pages?: number;
    current_page?: number;
    next_page?: number;
    prev_page?: number;
    records?: Array<T>;
    record?: T;
  };
}
