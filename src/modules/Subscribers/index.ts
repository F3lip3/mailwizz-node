/* eslint-disable @typescript-eslint/no-non-null-assertion */
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';

import errorHandler from '@utils/errorHandler';
import ICreateSubscriberDTO from './dtos/ICreateSubscriberDTO';
import ICreateSubscriberResponseDTO from './dtos/ICreateSubscriberResponseDTO';
import ISubscriber from './entities/ISubscriber';
import ISubscribers from './models/ISubscribers';

export default class Subscribers implements ISubscribers {
  constructor(private client: IRequest) {}

  public async add(
    list_id: string,
    data: Array<ICreateSubscriberDTO>
  ): Promise<IMailWizzResponse<ICreateSubscriberResponseDTO>> {
    try {
      const result = await Promise.all(
        data.map(subscriber =>
          this.client.post<IMailWizzResponse<ICreateSubscriberResponseDTO>>(
            `lists/${list_id}/subscribers`,
            {
              EMAIL: subscriber.email,
              FNAME: subscriber.fname,
              LNAME: subscriber.lname
            }
          )
        )
      );

      return {
        status: 200,
        statusText: 'success',
        data: {
          count: result.length.toString(),
          records: result.map(
            item => item.data?.record
          ) as ICreateSubscriberResponseDTO[]
        }
      };
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async all(
    list_id: string,
    page = 1,
    per_page = 10
  ): Promise<IMailWizzResponse<ISubscriber>> {
    try {
      const subscribers = await this.client.get<IMailWizzResponse<ISubscriber>>(
        `lists/${list_id}/subscribers`,
        {
          page,
          per_page
        }
      );
      return subscribers;
    } catch (err) {
      console.error(err);
      return errorHandler.handleException(err);
    }
  }
}
