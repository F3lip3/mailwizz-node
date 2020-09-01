import { AxiosError } from 'axios';
import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';

class ErrorHandler {
  private formatStatus(statusText: string | undefined): string {
    if (!statusText) return '';
    return statusText.replace(/ /g, '_').toLowerCase();
  }

  public handleException(err: AxiosError): IMailWizzEmptyResponse {
    if (err.isAxiosError) {
      return {
        status: this.formatStatus(err.response?.statusText),
        error: err.response?.data?.error ?? 'undefined'
      };
    }
    return { status: 'error', error: err.message };
  }
}

export default new ErrorHandler();
