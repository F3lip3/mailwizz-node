import { AxiosError } from 'axios';
import {
  IMailWizzEmptyResponse,
  IMailWizzResponse,
  IMailWizzSingleResponse
} from '@modules/MailWizz/entities/IMailWizzResponse';

class ErrorHandler {
  public handleException(err: AxiosError): IMailWizzEmptyResponse {
    return {
      status: Number(err.response?.status ?? 500),
      statusText: err.response?.statusText ?? 'Internal Server Error',
      error: err.response?.data?.error ?? err.message
    };
  }

  public handleGenericException<T>(err: AxiosError): IMailWizzResponse<T> {
    return {
      status: Number(err.response?.status ?? 500),
      statusText: err.response?.statusText ?? 'Internal Server Error',
      error: err.response?.data?.error ?? err.message,
      data: {
        records: []
      }
    };
  }

  public handleGenericExceptionSingle<T>(
    err: AxiosError
  ): IMailWizzSingleResponse<T> {
    return {
      status: Number(err.response?.status ?? 500),
      statusText: err.response?.statusText ?? 'Internal Server Error',
      error: err.response?.data?.error ?? err.message,
      data: {
        record: {} as T
      }
    };
  }
}

export default new ErrorHandler();
