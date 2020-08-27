import Lists from '@modules/Lists';
import Request from '@modules/Request';

let list: Lists;

describe('Lists', () => {
  beforeEach(() => {
    const client = new Request({
      baseUrl: process.env.MAILWIZZ_BASEURL || '',
      publicKey: process.env.MAILWIZZ_PUBLIC_KEY || '',
      secret: process.env.MAILWIZZ_SECRET || ''
    });
    list = new Lists(client);
  });

  // describe('all', () => {
  //   it('should be able to get all mailwizz lists', async () => {
  //     const result = await list.all();

  //     expect(result).toHaveProperty('status');
  //     expect(result.status).toBe('success');
  //   });
  // });

  describe('create', () => {
    it('should be able to create a list', async () => {
      const result = await list.create({
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

      console.info(result);

      expect(result).toHaveProperty('status');
      expect(result.status).toBe('success');
    });
  });

  // describe('get', () => {
  //   it('should be able to get a list by id', async () => {
  //     const result = await list.get('pa828dzfp9f0f');

  //     expect(result).toHaveProperty('status');
  //     expect(result.data).toHaveProperty('record');
  //   });

  //   it('should return not found when a list does not exists', async () => {
  //     const result = await list.get('teste');

  //     expect(result).toHaveProperty('status');
  //     expect(result.status).toBe('not_found');
  //   });
  // });
});
