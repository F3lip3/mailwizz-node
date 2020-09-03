import {
  IMailWizzEmptyResponse,
  IMailWizzResponse,
  IMailWizzSingleResponse
} from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateSubscriberDTO from '../dtos/ICreateSubscriberDTO';
import ISubscriber, { ISubscriberCreateResult } from '../entities/ISubscriber';

export default interface ISubscribers {
  all(
    list_id: string,
    page?: number,
    per_page?: number
  ): Promise<IMailWizzResponse<ISubscriber>>;

  bulk(
    list_id: string,
    data: Array<ICreateSubscriberDTO>
  ): Promise<IMailWizzResponse<ISubscriberCreateResult>>;

  create(
    list_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzSingleResponse<ISubscriberCreateResult>>;

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
  ): Promise<IMailWizzSingleResponse<ISubscriber>>;

  getByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzSingleResponse<ISubscriber>>;

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
  ): Promise<IMailWizzSingleResponse<ISubscriber>>;

  updateByEmail(
    list_id: string,
    email: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzSingleResponse<ISubscriber>>;

  upsert(
    list_id: string,
    data: Array<ICreateSubscriberDTO>
  ): Promise<IMailWizzResponse<ISubscriber>>;
}
