import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import ISubscriber from '@modules/Subscribers/entities/ISubscriber';

export default interface ICreateSubscriberResponseDTO
  extends IMailWizzResponse<ISubscriber> {
  subscriber_id?: string;
}
