import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateListDTO from '../dtos/ICreatListDTO';
import IList from '../entities/IList';

export default interface ILists {
  all(): Promise<IMailWizzResponse<IList>>;
  create(data: ICreateListDTO): Promise<void>;
  get(listId: string): Promise<IMailWizzResponse<IList>>;
}
