import IMailWizzGenericError from './IMailWizzGenericError';

export interface IMailWizzEmptyResponse {
  status: number | string;
  statusText: string;
  error?: string | IMailWizzGenericError;
}

export interface IMailWizzResponse<T> extends IMailWizzEmptyResponse {
  data: IMailWizzResponseData<T>;
}

interface IMailWizzResponseData<T> {
  count?: string;
  total_pages?: number;
  current_page?: number;
  next_page?: number;
  prev_page?: number;
  records: Array<T>;
}

export interface IMailWizzSingleResponse<T> extends IMailWizzEmptyResponse {
  data: IMailWizzSingleResponseData<T>;
}

interface IMailWizzSingleResponseData<T> {
  record: T;
}
