/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  IMailWizzEmptyResponse,
  IMailWizzResponse,
  IMailWizzSingleResponse
} from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';
import errorHandler from '@utils/errorHandler';

import ICreateSubscriberDTO from './dtos/ICreateSubscriberDTO';
import ISubscriber, { ISubscriberCreateResult } from './entities/ISubscriber';
import ISubscribers from './models/ISubscribers';

export default class Subscribers implements ISubscribers {
  constructor(private client: IRequest) {}

  public async all(
    list_id: string,
    page = 1,
    per_page = 10
  ): Promise<IMailWizzResponse<ISubscriber>> {
    try {
      const result = await this.client.get<ISubscriber>(
        `lists/${list_id}/subscribers`,
        {
          page,
          per_page
        }
      );

      return result as IMailWizzResponse<ISubscriber>;
    } catch (err) {
      console.error(err);
      return errorHandler.handleGenericException<ISubscriber>(err);
    }
  }

  public async bulk(
    list_id: string,
    data: Array<ICreateSubscriberDTO>
  ): Promise<IMailWizzResponse<ISubscriberCreateResult>> {
    try {
      const result = await Promise.all(
        data.map(subscriber => this.create(list_id, subscriber))
      );

      return {
        status: 200,
        statusText: 'success',
        data: {
          count: result.length.toString(),
          records: result.map(
            item => item.data?.record
          ) as ISubscriberCreateResult[]
        }
      };
    } catch (err) {
      return errorHandler.handleGenericException<ISubscriberCreateResult>(err);
    }
  }

  public async create(
    list_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzSingleResponse<ISubscriberCreateResult>> {
    try {
      const result = await this.client.post<ISubscriberCreateResult>(
        `lists/${list_id}/subscribers`,
        {
          EMAIL: data.email,
          FNAME: data.fname,
          LNAME: data.lname
        }
      );

      return result as IMailWizzSingleResponse<ISubscriberCreateResult>;
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<ISubscriberCreateResult>(
        err
      );
    }
  }

  public async delete(
    list_id: string,
    subscriber_id: string
  ): Promise<IMailWizzEmptyResponse> {
    try {
      const result = await this.client.delete(
        `lists/${list_id}/subscribers/${subscriber_id}`
      );

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async deleteByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzEmptyResponse> {
    try {
      const subscriber = await this.getByEmail(list_id, email);
      if (subscriber?.status !== 200) {
        return subscriber;
      }

      const result = await this.delete(
        list_id,
        subscriber.data.record.subscriber_uid
      );

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async get(
    list_id: string,
    subscriber_id: string
  ): Promise<IMailWizzSingleResponse<ISubscriber>> {
    try {
      const result = await this.client.get<ISubscriber>(
        `lists/${list_id}/subscribers/${subscriber_id}`
      );

      return result as IMailWizzSingleResponse<ISubscriber>;
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<ISubscriber>(err);
    }
  }

  public async getByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzSingleResponse<ISubscriber>> {
    try {
      const result = await this.client.get<ISubscriber>(
        `lists/${list_id}/subscribers/search-by-email`,
        {
          EMAIL: email
        }
      );

      return result as IMailWizzSingleResponse<ISubscriber>;
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<ISubscriber>(err);
    }
  }

  public async unsubscribe(
    list_id: string,
    subscriber_id: string
  ): Promise<IMailWizzEmptyResponse> {
    try {
      const result = await this.client.put(
        `lists/${list_id}/subscribers/${subscriber_id}/unsubscribe`
      );

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async unsubscribeByEmail(
    list_id: string,
    email: string
  ): Promise<IMailWizzEmptyResponse> {
    try {
      const subscriber = await this.getByEmail(list_id, email);
      if (subscriber?.status !== 200) {
        return subscriber;
      }

      const result = await this.unsubscribe(
        list_id,
        subscriber.data.record.subscriber_uid
      );

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async update(
    list_id: string,
    subscriber_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzSingleResponse<ISubscriber>> {
    try {
      const result = await this.client.put<ISubscriber>(
        `lists/${list_id}/subscribers/${subscriber_id}`,
        data
      );

      return result as IMailWizzSingleResponse<ISubscriber>;
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<ISubscriber>(err);
    }
  }

  public async updateByEmail(
    list_id: string,
    email: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzSingleResponse<ISubscriber>> {
    try {
      const subscriber = await this.getByEmail(list_id, email);
      if (subscriber?.status !== 200) {
        return subscriber;
      }

      const result = await this.update(
        list_id,
        subscriber.data.record.subscriber_uid,
        data
      );

      return result;
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<ISubscriber>(err);
    }
  }

  public async upsert(
    list_id: string,
    data: ICreateSubscriberDTO[]
  ): Promise<IMailWizzResponse<ISubscriber>> {
    try {
      const result = await Promise.all(
        data.map(async subscriber => {
          const existingSubscriber = await this.getByEmail(
            list_id,
            subscriber.email
          );

          if (existingSubscriber.status === 200)
            return this.update(
              list_id,
              existingSubscriber.data.record.subscriber_uid,
              subscriber
            );

          return this.create(list_id, subscriber);
        })
      );

      return {
        status: 200,
        statusText: 'success',
        data: {
          count: result.length.toString(),
          records: result.map(item => item.data?.record) as ISubscriber[]
        }
      };
    } catch (err) {
      return errorHandler.handleGenericException<ISubscriber>(err);
    }
  }
}
