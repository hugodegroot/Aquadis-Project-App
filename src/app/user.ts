export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  points: number;
  groups: [null];
  adminStatus: number;

  // Register User Constructor
  constructor(email: string, firstname: string, lastname: string, password: string) {
    this.email = email;
    this.firstName = firstname;
    this.lastName = lastname;
    this.password = password;
    this.groups = [null];
    this.adminStatus = 0;
  }
}
