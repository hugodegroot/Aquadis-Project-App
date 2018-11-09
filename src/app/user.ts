export class User {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  points: number;
  isAdmin: boolean;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
