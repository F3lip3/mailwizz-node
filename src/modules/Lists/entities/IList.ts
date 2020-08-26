export default interface IList {
  general: {
    list_uid: string;
    name: string;
    display_name: string;
    description: string;
    opt_in: 'single' | 'double';
  };
  defaults: {
    from_name: string;
    from_email: string;
    reply_to: string;
    subject: string;
  };
  notifications: {
    subscribe: 'yes' | 'no';
    unsubscribe: 'yes' | 'no';
    subscribe_to: string;
    unsubscribe_to: string;
  };
  company?: {
    name?: string;
    country?: string;
    zone?: string;
    address_1?: string;
    address_2?: string;
    zone_name?: string;
    city?: string;
    zip_code?: string;
  };
}
