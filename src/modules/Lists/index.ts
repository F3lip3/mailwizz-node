import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import IRequest from '@modules/Request/models/IRequest';

import IList from './entities/IList';
import ILists from './models/ILists';

export default class Lists implements ILists {
  constructor(private client: IRequest) {}

  public async all(): Promise<IMailWizzResponse<IList>> {
    const lists = await this.client.get<IMailWizzResponse<IList>>('lists');
    return lists;
  }
}
