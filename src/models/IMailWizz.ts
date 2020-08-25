import IMailWizzInstance from 'entities/IMailWizzInstance';
import IMailWizzConfig from '@config/mailwizz';

export default interface IMailWizz {
  create(config: IMailWizzConfig): IMailWizzInstance;
}
