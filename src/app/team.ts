import {Racer} from './racer';

export class Team {

  name: string;
  racers: Racer[];


  constructor(name: string) {
    this.name = name;
  }
}
