import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import IList from '../entities/IList';

export default interface ICreateListResponseDTO
  extends IMailWizzResponse<IList> {
  list_uid?: string;
}
