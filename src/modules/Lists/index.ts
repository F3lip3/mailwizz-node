import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';
import errorHandler from '@utils/errorHandler';

import ICreateListDTO from './dtos/ICreatListDTO';
import ICreateListResponseDTO from './dtos/ICreatListResponseDTO';
import IList from './entities/IList';
import ILists from './models/ILists';

export default class Lists implements ILists {
  constructor(private client: IRequest) {}

  public async all(page = 1, per_page = 10): Promise<IMailWizzResponse<IList>> {
    try {
      const lists = await this.client.get<IMailWizzResponse<IList>>('lists', {
        page,
        per_page
      });

      return lists;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async create(data: ICreateListDTO): Promise<ICreateListResponseDTO> {
    try {
      const result = await this.client.post<ICreateListResponseDTO>(
        'lists',
        data
      );

      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async delete(list_id: string): Promise<IMailWizzEmptyResponse> {
    try {
      const result = await this.client.delete<IMailWizzEmptyResponse>(
        `lists/${list_id}`
      );
      return result;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }

  public async get(list_id: string): Promise<IMailWizzResponse<IList>> {
    try {
      const list = await this.client.get<IMailWizzResponse<IList>>(
        `lists/${list_id}`
      );

      return list;
    } catch (err) {
      return errorHandler.handleException(err);
    }
  }
}
