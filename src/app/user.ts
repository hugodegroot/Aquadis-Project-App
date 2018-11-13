export class User {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  points: number;
  groups: [null];
  adminStatus: number;

  // Register User Constructor
  constructor(email: string, username: string, firstname: string, lastname: string, password: string) {
    this.email = email;
    this.userName = username;
    this.firstName = firstname;
    this.lastName = lastname;
    this.password = password;
    this.groups = [null];
    this.adminStatus = 0;
  }

  constructor(id: number, email: string, username: string, firstName: string, lastName: string, password: string, points: number, adminStatus: number) {
    this.id = id;
    this.email = email;
    this.userName = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.points = points;
    this.adminStatus = adminStatus;
  }

}
