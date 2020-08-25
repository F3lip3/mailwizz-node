import IMailWizzListInstance from '@entities/IMailWizzListInstance';

export default interface IMailWizzList {
  all(): Promise<IMailWizzListInstance>;
}
