import IConfig from '@config/mailwizz';

import IMailWizzInstance from '../entities/IMailWizzInstance';

export default interface IMailWizz {
  create(config: IConfig): IMailWizzInstance;
}
