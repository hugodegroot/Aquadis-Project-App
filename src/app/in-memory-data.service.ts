import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      // get user by email works without special characters in it ('@')
      {id: 1, email: 'asd@asd.nl', firstname: 'asd', lastname: 'asd', password: 'asd', role: 1, points: 5},
      {id: 2, email: 'awd@awd.nl', firstname: 'awd', lastname: 'awd', password: 'awd', role: 1, points: 10}
    ];
    return {users};
  }
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
