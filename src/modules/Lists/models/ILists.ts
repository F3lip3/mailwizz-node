import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateListDTO from '../dtos/ICreatListDTO';
import ICreateListResponseDTO from '../dtos/ICreatListResponseDTO';
import IList from '../entities/IList';

export default interface ILists {
  all(page?: number, per_page?: number): Promise<IMailWizzResponse<IList>>;
  create(data: ICreateListDTO): Promise<ICreateListResponseDTO>;
  delete(list_id: string): Promise<IMailWizzEmptyResponse>;
  get(list_id: string): Promise<IMailWizzResponse<IList>>;
}
