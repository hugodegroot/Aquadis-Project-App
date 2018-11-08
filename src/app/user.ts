export class User {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  points: number;
  isAdmin: boolean;

  constructor(email: String, password: String) {
    this.email = email;
    this.password = password;
  }
}
