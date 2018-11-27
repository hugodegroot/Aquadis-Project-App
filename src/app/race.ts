export class Race {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  startgrid: [number];
  endgrid: [number];

  constructor(name: string, startDate: string, endDate: string, location: string) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
  }
}
