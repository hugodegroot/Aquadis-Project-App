import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { email: 'asd@asd.nl', username: 'asd', role: 1, password: 'asd' },
      { email: 'awd@awd.nl', username: 'awd', role: 1,  password: 'awd'}
    ];
    return {users};
  }

}
