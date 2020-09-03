import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateListDTO from '../dtos/ICreatListDTO';
import IList from '../entities/IList';

export default interface ILists {
  all(page?: number, per_page?: number): Promise<IMailWizzResponse<IList>>;
  create(
    data: ICreateListDTO
  ): Promise<IMailWizzResponse<Pick<IList, 'list_uid'>>>;
  delete(list_id: string): Promise<IMailWizzEmptyResponse>;
  get(list_id: string): Promise<IMailWizzResponse<IList>>;
}
