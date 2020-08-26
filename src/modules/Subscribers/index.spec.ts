import Request from '@modules/Request';
import Subscribers from '@modules/Subscribers';

let subscribers: Subscribers;

describe('List', () => {
  beforeEach(() => {
    const client = new Request({
      baseUrl: process.env.MAILWIZZ_BASEURL || '',
      publicKey: process.env.MAILWIZZ_PUBLIC_KEY || '',
      secret: process.env.MAILWIZZ_SECRET || ''
    });
    subscribers = new Subscribers(client);
  });

  describe('all', () => {
    it('should be able to get all subscribers of a lists', async () => {
      const result = await subscribers.all('pa828dzfp9f0f');

      expect(result).toHaveProperty('status');
      expect(result.status).toBe('success');
    });
  });
});
