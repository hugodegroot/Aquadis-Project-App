import {User} from "./user";
import {Race} from './race';

export class Group {
  id: number;
  name: string;
  users: User[];
  races: Race[];

  // Register Group Constructor
  constructor(name: string) {
    this.name = name;
  }
}
