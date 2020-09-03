import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
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

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async create(
    data: ICreateListDTO
  ): Promise<IMailWizzResponse<Partial<IList>>> {
    try {
      const result = await this.client.post<Partial<IList>>('lists', data);
      const createResult: IMailWizzResponse<Partial<IList>> & {
        list_uid?: string;
      } = result;

      return {
        status: result.status,
        statusText: result.statusText,
        data: {
          record: {
            list_uid: createResult.list_uid
          }
        }
      };
    } catch (err) {
      return errorHandler.handleException(err);
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

  public async get(list_id: string): Promise<IMailWizzResponse<IList>> {
    try {
      const result = await this.client.get<IList>(`lists/${list_id}`);

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }
}
