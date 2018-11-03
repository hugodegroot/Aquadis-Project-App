import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Race } from './race';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {id: 1, email: 'asd@asd.nl', username: 'asd', firstname: 'asd', lastname: 'asd', password: 'asd', role: 1, points: 5},
      {id: 2, email: 'awd@awd.nl', username: 'awd', firstname: 'awd', lastname: 'awd', password: 'awd', role: 1, points: 10}
    ];
    const races = [
      {id: 1, name: 'grand prix', location: 'Tokyo', startgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], endgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {id: 2, name: 'superrace', location: 'Monaco', startgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], endgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9]}
    ];
    const groups = [
      {id: 1, name: 'test group'}
    ];


    return {users, races, groups};
  }
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
