import IMailWizzConfig from '@config/mailwizz';
import IMailWizzInstance from '@entities/IMailWizzInstance';
import IMailWizz from '@models/IMailWizz';
import List from '@modules/List';
import Request from '@modules/Request';

class MailWizz implements IMailWizz {
  public create(config: IMailWizzConfig): IMailWizzInstance {
    const client = new Request(config);
    const instance: IMailWizzInstance = {
      lists: new List(client)
    };

    return instance;
  }
}

export default MailWizz;
