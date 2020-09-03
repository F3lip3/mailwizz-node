import {
  IMailWizzEmptyResponse,
  IMailWizzResponse,
  IMailWizzSingleResponse
} from '@modules/MailWizz/entities/IMailWizzResponse';

import ICreateListDTO from '../dtos/ICreatListDTO';
import IList from '../entities/IList';

export default interface ILists {
  all(page?: number, per_page?: number): Promise<IMailWizzResponse<IList>>;
  create(
    data: ICreateListDTO
  ): Promise<IMailWizzSingleResponse<Required<Pick<IList, 'list_uid'>>>>;
  delete(list_id: string): Promise<IMailWizzEmptyResponse>;
  get(list_id: string): Promise<IMailWizzSingleResponse<IList>>;
}
