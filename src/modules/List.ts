import IMailWizzListInstance from '@entities/IMailWizzListInstance';
import IMailWizzList from '@models/IMailWizzList';
import IMailWizzRequest from '@models/IMailWizzRequest';

export default class List implements IMailWizzList {
  constructor(private client: IMailWizzRequest) {}

  public async all(): Promise<IMailWizzListInstance> {
    const lists = await this.client.get<IMailWizzListInstance>('lists');
    return lists;
  }
}
