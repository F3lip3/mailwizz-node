import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import IList from '../entities/IList';

export default interface ILists {
  all(): Promise<IMailWizzResponse<IList>>;
}
