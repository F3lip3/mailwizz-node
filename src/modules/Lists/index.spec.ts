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

  describe('all', () => {
    it('should be able to get all mailwizz lists', async () => {
      const lists = await list.all();

      expect(lists).toHaveProperty('status');
      expect(lists.status).toBe('success');
    });
  });
});
