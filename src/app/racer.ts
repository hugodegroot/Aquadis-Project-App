export class Racer {
  id: number;
  firstName: string;
  lastName: string;
  salary: number;

  /**
   * Changes the number to a sting where the number contains thousand separators
   *
   * @param number salary of a racer
   */
  public printNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
