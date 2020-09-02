import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateSubscriberDTO from '../dtos/ICreateSubscriberDTO';
import ICreateSubscriberResponseDTO from '../dtos/ICreateSubscriberResponseDTO';
import ISubscriber from '../entities/ISubscriber';

export default interface ISubscribers {
  all(
    list_id: string,
    page?: number,
    per_page?: number
  ): Promise<IMailWizzResponse<ISubscriber>>;

  create(
    list_id: string,
    data: ICreateSubscriberDTO
  ): Promise<IMailWizzResponse<ICreateSubscriberResponseDTO>>;
}
