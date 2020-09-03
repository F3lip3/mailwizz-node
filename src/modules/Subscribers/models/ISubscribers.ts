import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateSubscriberDTO from '../dtos/ICreateSubscriberDTO';
import ISubscriber from '../entities/ISubscriber';

export default interface ISubscribers {
  all(
    list_id: string,
    page?: number,
    per_page?: number
  ): Promise<IMailWizzResponse<ISubscriber>>;

  bulk(
    list_id: string,
    data: Array<ICreateSubscriberDTO>
  ): Promise<IMailWizzResponse<ISubscriber>>;

  create(
    list_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzResponse<ISubscriber>>;

  delete(
    list_id: string,
    subscriber_id: string
  ): Promise<IMailWizzEmptyResponse>;

  deleteByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzEmptyResponse>;

  get(
    list_id: string,
    subscriber_id: string
  ): Promise<IMailWizzResponse<ISubscriber>>;

  getByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzResponse<ISubscriber>>;

  unsubscribe(
    list_id: string,
    subscriber_id: string
  ): Promise<IMailWizzEmptyResponse>;

  unsubscribeByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzEmptyResponse>;

  update(
    list_id: string,
    subscriber_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzResponse<ISubscriber>>;

  updateByEmail(
    list_id: string,
    email: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzResponse<ISubscriber>>;

  upsert(
    list_id: string,
    data: Array<ICreateSubscriberDTO>
  ): Promise<IMailWizzResponse<ISubscriber>>;
}
