import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';

import errorHandler from '@utils/errorHandler';
import ICreateSubscriberDTO from './dtos/ICreateSubscriberDTO';
import ICreateSubscriberResponseDTO from './dtos/ICreateSubscriberResponseDTO';
import ISubscriber from './entities/ISubscriber';
import ISubscribers from './models/ISubscribers';

export default class Subscribers implements ISubscribers {
  constructor(private client: IRequest) {}

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

  public async create(
    list_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzResponse<ICreateSubscriberResponseDTO>> {
    try {
      console.info('adding subscriber with data:', data);
      const result = await this.client.post<
        IMailWizzResponse<ICreateSubscriberResponseDTO>
      >(`lists/${list_id}/subscribers`, {
        EMAIL: data.email,
        FNAME: data.fname,
        LNAME: data.lname
      });

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }
}
