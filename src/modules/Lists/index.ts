import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';
import errorHandler from '@utils/errorHandler';

import ICreateListDTO from './dtos/ICreatListDTO';
import ICreateListResponseDTO from './dtos/ICreatListResponseDTO';
import IList from './entities/IList';
import ILists from './models/ILists';

export default class Lists implements ILists {
  constructor(private client: IRequest) {}

  public async all(): Promise<IMailWizzResponse<IList>> {
    const lists = await this.client.get<IMailWizzResponse<IList>>('lists');
    return lists;
  }

  public async create(data: ICreateListDTO): Promise<ICreateListResponseDTO> {
    try {
      const result = await this.client.post<ICreateListResponseDTO>(
        'lists',
        data
      );

      return result;
    } catch (err) {
      return errorHandler.handleException<IList>(err);
    }
  }

  public async get(listId: string): Promise<IMailWizzResponse<IList>> {
    try {
      const list = await this.client.get<IMailWizzResponse<IList>>(
        `lists/${listId}`
      );

      return list;
    } catch (err) {
      return errorHandler.handleException<IList>(err);
    }
  }
}
