import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateSubscriberDTO from '../dtos/ICreateSubscriberDTO';
import ICreateSubscriberResponseDTO from '../dtos/ICreateSubscriberResponseDTO';
import ISubscriber from '../entities/ISubscriber';

export default interface ISubscribers {
  all(listId: string): Promise<IMailWizzResponse<ISubscriber>>;
  create(
    listId: string,
    data: ICreateSubscriberDTO
  ): Promise<ICreateSubscriberResponseDTO>;
}
