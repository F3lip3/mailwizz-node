import {
  IMailWizzEmptyResponse,
  IMailWizzResponse,
  IMailWizzSingleResponse
} from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';
import errorHandler from '@utils/errorHandler';

import ICreateListDTO from './dtos/ICreatListDTO';
import IList from './entities/IList';
import ILists from './models/ILists';

export default class Lists implements ILists {
  constructor(private client: IRequest) {}

  public async all(page = 1, per_page = 10): Promise<IMailWizzResponse<IList>> {
    try {
      const result = await this.client.get<IList>('lists', {
        page,
        per_page
      });

      return result as IMailWizzResponse<IList>;
    } catch (err) {
      return errorHandler.handleGenericException<IList>(err);
    }
  }

  public async create(
    data: ICreateListDTO
  ): Promise<IMailWizzSingleResponse<Required<Pick<IList, 'list_uid'>>>> {
    try {
      const result = await this.client.post<IList>('lists', data);
      const createResult: IMailWizzSingleResponse<IList> & {
        list_uid?: string;
      } = result as IMailWizzSingleResponse<IList>;

      return {
        status: result.status,
        statusText: result.statusText,
        data: {
          record: {
            list_uid: createResult.list_uid ?? ''
          }
        }
      };
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<
        Required<Pick<IList, 'list_uid'>>
      >(err);
    }
  }

  public async delete(list_id: string): Promise<IMailWizzEmptyResponse> {
    try {
      const result = await this.client.delete(`lists/${list_id}`);

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async get(list_id: string): Promise<IMailWizzSingleResponse<IList>> {
    try {
      const result = await this.client.get<IList>(`lists/${list_id}`);

      return result as IMailWizzSingleResponse<IList>;
    } catch (err) {
      return errorHandler.handleGenericExceptionSingle<IList>(err);
    }
  }
}
