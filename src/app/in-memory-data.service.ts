import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Race } from './race';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {id: 1, email: 'pietdrap@test.nl', username: 'piet', firstName: 'Piet', lastName: 'Drap', password: 'test', isadmin: 1, points: 5},
      {id: 2, email: 'sjaaktop@test.nl', username: 'sjaak', firstName: 'Sjaak', lastName: 'Top', password: 'test', isadmin: 1, points: 10},
      {id: 3, email: 'sjonhek@test.nl', username: 'sjon', firstName: 'Sjon', lastName: 'Hek', password: 'test', isadmin: 1, points: 7},
      {id: 4, email: 'kakblyat@test.nl', username: 'kak', firstName: 'Kak', lastName: 'Blyat', password: 'test', isadmin: 1, points: 8},
      {id: 5, email: 'suhhdude@test.nl', username: 'suhh', firstName: 'Suhh', lastName: 'Dude', password: 'test', isadmin: 1, points: 4}
    ];
    const races = [
      {id: 1, name: 'grand prix', location: 'Tokyo',
        startgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], endgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {id: 2, name: 'superrace', location: 'Monaco',
        startgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], endgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {id: 3, name: 'Banana Cup', location: 'Barcelona',
        startgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], endgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
      {id: 4, name: 'Butter Championship', location: 'Las-Vegas',
        startgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], endgrid: [1, 2, 3, 4, 5, 6, 7, 8, 9]}
    ];
    const groups = [
      {id: 1, name: 'test group 1' , members: [1, 2]},
      {id: 2, name: 'test group 2',  members: [3, 4]},
      {id: 3, name: 'test group 3',  members: [5, 3]}
    ];


    return {users, races, groups};
  }
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
