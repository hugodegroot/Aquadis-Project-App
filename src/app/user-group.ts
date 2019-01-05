import {User} from "./user";
import {Group} from "./group";
import {Race} from './race';

export class UserGroup {

  points: number;
  role: string;
  budget: number;

  user: User;
  firstName: string;
  lastName: string;

  group: Group;

  race: Race;

  constructor(points: number, role: string, user: User, group: Group, race: Race) {
    this.points = points;
    this.role = role;
    this.user = user;
    this.group = group;
    this.race = race;
  }

}
