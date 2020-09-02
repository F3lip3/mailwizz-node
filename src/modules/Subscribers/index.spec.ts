import Lists from '@modules/Lists';
import Request from '@modules/Request';
import Subscribers from '@modules/Subscribers';
// import sleep from '@utils/sleep';

let listId: string;
let lists: Lists;
let subscribers: Subscribers;

describe('Subscribers', () => {
  beforeAll(async () => {
    const client = new Request({
      baseUrl: process.env.MAILWIZZ_BASEURL || '',
      publicKey: process.env.MAILWIZZ_PUBLIC_KEY || '',
      secret: process.env.MAILWIZZ_SECRET || ''
    });

    lists = new Lists(client);
    subscribers = new Subscribers(client);

    const listSample = await lists.create({
      general: {
        name: 'Teste 01',
        description: 'Teste 01 do Felipe',
        opt_in: 'single'
      },
      defaults: {
        from_name: 'Felipe',
        from_email: 'felipe@dinfo.com.br',
        reply_to: 'felipe@dinfo.com.br'
      },
      company: {
        name: 'LeadLovers Tecnologia',
        country: 'Brazil',
        zone: 'Paraná',
        address_1: 'Rua do Semeador, 461',
        city: 'Curitiba',
        zone_name: 'CIC',
        zip_code: '81270-050',
        phone: '+55 41 3542 1340',
        website: 'https://leadlovers.com'
      }
    });

    listId = listSample.list_uid ?? '';
  });

  afterAll(async () => {
    await lists.delete(listId);
  });

  describe('list all', () => {
    it('should be able to list all subscribers of a list', async () => {
      const result = await subscribers.all(listId);

      expect(result).toHaveProperty('status');
      expect(result.status).toBe('success');
    });
  });

  // describe('create', () => {
  //   it('should be able to add subscriber to a list', async () => {
  //     const result = await subscribers.create(listId, {
  //       email: 'felipe+subscriber01@leadlovers.com',
  //       fname: 'Felipe Humberto',
  //       lname: 'Teixeira'
  //     });

  //     expect(result).toHaveProperty('status');
  //     expect(result.status).toBe('success');
  //   });
  // });
});
