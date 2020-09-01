import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';

import errorHandler from '@utils/errorHandler';
import ICreateSubscriberDTO from './dtos/ICreateSubscriberDTO';
import ICreateSubscriberResponseDTO from './dtos/ICreateSubscriberResponseDTO';
import ISubscriber from './entities/ISubscriber';
import ISubscribers from './models/ISubscribers';

export default class Subscribers implements ISubscribers {
  constructor(private client: IRequest) {}

  public async all(listId: string): Promise<IMailWizzResponse<ISubscriber>> {
    try {
      const subscribers = await this.client.get<IMailWizzResponse<ISubscriber>>(
        `lists/${listId}/subscribers`
      );
      return subscribers;
    } catch (err) {
      console.error(err);
      return errorHandler.handleException(err);
    }
  }

  public async create(
    listId: string,
    data: ICreateSubscriberDTO
  ): Promise<ICreateSubscriberResponseDTO> {
    try {
      const result = await this.client.post<ICreateSubscriberResponseDTO>(
        `lists/${listId}/subscribers`,
        data
      );

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }
}
