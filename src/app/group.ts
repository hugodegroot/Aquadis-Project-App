import {User} from "./user";

export class Group {
  id: number;
  name: string;
  users: User[];

  // Register Group Constructor
  constructor(name: string) {
    this.name = name;
  }
}
