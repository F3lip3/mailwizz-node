import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ISubscriber from '../entities/ISubscriber';

export default interface ISubscribers {
  all(listId: string): Promise<IMailWizzResponse<ISubscriber>>;
}
