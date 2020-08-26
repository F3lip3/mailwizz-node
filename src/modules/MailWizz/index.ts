import IConfig from '@config/mailwizz';
import Lists from '@modules/Lists';
import Request from '@modules/Request';

import IMailWizzInstance from './entities/IMailWizzInstance';
import IMailWizz from './models/IMailWizz';

class MailWizz implements IMailWizz {
  public create(config: IConfig): IMailWizzInstance {
    const client = new Request(config);
    const instance: IMailWizzInstance = {
      lists: new Lists(client)
    };

    return instance;
  }
}

export default MailWizz;
