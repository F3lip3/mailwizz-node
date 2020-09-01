import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateListDTO from '../dtos/ICreatListDTO';
import ICreateListResponseDTO from '../dtos/ICreatListResponseDTO';
import IList from '../entities/IList';

export default interface ILists {
  all(): Promise<IMailWizzResponse<IList>>;
  create(data: ICreateListDTO): Promise<ICreateListResponseDTO>;
  delete(listId: string): Promise<IMailWizzEmptyResponse>;
  get(listId: string): Promise<IMailWizzResponse<IList>>;
}
