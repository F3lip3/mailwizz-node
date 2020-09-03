export default interface ISubscriber {
  subscriber_uid: string;
  email: string;
  fname: string;
  lname: string;
  status: string;
  source: string;
  ip_address: string;
}

export type ISubscriberCreateResult = Omit<
  ISubscriber,
  'fname' | 'lname' | 'status'
> & {
  date_added: Date;
};
