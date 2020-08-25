import 'dotenv/config';

import MailWizz from '@modules/MailWizz';

const mailwizz = MailWizz.create({
  baseUrl: process.env.MAILWIZZ_BASEURL || '',
  publicKey: process.env.MAILWIZZ_PUBLIC_KEY || '',
  secret: process.env.MAILWIZZ_SECRET || ''
});

mailwizz.lists.all().then(lists => {
  console.info('mailwizz lists:', lists);
});
