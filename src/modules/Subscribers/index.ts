import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';

import ISubscriber from './entities/ISubscriber';
import ISubscribers from './models/ISubscribers';

export default class Subscribers implements ISubscribers {
  constructor(private client: IRequest) {}

  public async all(listId: string): Promise<IMailWizzResponse<ISubscriber>> {
    const subscribers = await this.client.get<IMailWizzResponse<ISubscriber>>(
      `lists/${listId}/subscribers`
    );
    return subscribers;
  }
}
