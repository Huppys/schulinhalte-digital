import { useMultiplyCalculationStore } from "@/stores/multiplyCalculation";

export class Mathe1x1Helper {
  private multiplyStore;

  constructor() {
    this.multiplyStore = useMultiplyCalculationStore();
  }

  /**
   * Return a shuffled list of factors
   * @param count
   * @param factor
   */
  public getShuffledFactors(
    count: number,
    factor: number | undefined
  ): Array<[number, number]> {
    const nextTodos = this.multiplyStore.getNextTodos(count);

    let firstFactor = this.getRandomFactor();

    if (factor) {
      firstFactor = factor;
    }

    const secondFactors = this.shuffleNumbers(this.createRange(1, 10));

    return nextTodos.concat(
      secondFactors
        .splice(0, count - nextTodos.length)
        .map((value) => [firstFactor, value])
    );
  }

  public multiply(a: number, b: number): number {
    return a * b;
  }

  public divide(a: number, b: number): number {
    return a / b;
  }

  private getRandomFactor(min: number = 2, max: number = 9): number {
    const result = Math.ceil(Math.random() * max);
    return result < min ? this.getRandomFactor() : result;
  }

  private shuffleNumbers(array: number[]) {
    let curId = array.length;
    while (0 !== curId) {
      const randId = Math.floor(Math.random() * curId);
      curId -= 1;
      const tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

  private createRange(start: number, end: number) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  getShuffledDividends(maxTodos: number): Array<[number, number]> {
    return this.getShuffledFactors(maxTodos).map((item) => {
      return [item[0] * item[1], item[0]];
    });
  }
}
