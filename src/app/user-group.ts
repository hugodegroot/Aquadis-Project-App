import {User} from "./user";
import {Group} from "./group";

export class UserGroup {

  points: number;
  status: string;
  user: User;
  group: Group;

  constructor(points: number, status: string, user: User, group: Group) {
    this.points = points;
    this.status = status;
    this.user = user;
    this.group = group;
  }

}
