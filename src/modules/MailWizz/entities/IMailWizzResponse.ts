import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';

export default interface IMailWizzResponse<T> extends IMailWizzEmptyResponse {
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
