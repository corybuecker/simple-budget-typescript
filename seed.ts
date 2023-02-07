import { exit } from 'process';
import { AppDataSource } from './src/data-source';

AppDataSource.initialize().then(() => {
  Promise.all([
    AppDataSource.query(
      'insert into "user" (id, email) values (\'5cda5921-f1a4-4b95-a6b1-3f50e32152be\', \'cory.buecker@gmail.com\') on conflict do nothing',
    ),
    AppDataSource.query(
      'insert into "account" ("userId",name,amount) values (\'5cda5921-f1a4-4b95-a6b1-3f50e32152be\',\'test\',120)',
    ),
  ]).then(() => {
    console.log('done');
    exit(0);
  });
});
