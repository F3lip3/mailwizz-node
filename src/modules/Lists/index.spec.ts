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
      const result = await list.all();

      expect(result).toHaveProperty('status');
      expect(result.status).toBe('success');
    });
  });

  describe('get', () => {
    it('should be able to get a list by id', async () => {
      const result = await list.get('pa828dzfp9f0f');

      expect(result).toHaveProperty('status');
      expect(result.data).toHaveProperty('record');
    });

    it('should return not found when a list does not exists', async () => {
      const result = await list.get('teste');

      expect(result).toHaveProperty('status');
      expect(result.status).toBe('not_found');
    });
  });
});
