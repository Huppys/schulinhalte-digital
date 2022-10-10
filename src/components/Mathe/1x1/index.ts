import { useMultiplyCalculationStore } from '@/stores/multiplyCalculation';


export class Mathe1x1Helper {

   private multiplyStore;

   constructor() {
      this.multiplyStore = useMultiplyCalculationStore();
   }

   private getRandomFactor(max: number = 9): number {
      return Math.ceil(Math.random() * max);
   }

   public getFactors(count: number): Array<[number, number]> {

      if ( this.multiplyStore.hasTodos(count) ) {
         return this.multiplyStore.getNextTodos(count);
      }

      const firstFactor = this.getRandomFactor();
      const secondFactors = this.shuffleNumbers(this.createRange(1, 10));

      const factors = new Array<[number, number]>();

      secondFactors.forEach((value) => {
         factors.push([firstFactor, value]);
      });

      return factors;
   }

   private shuffleNumbers(array: number[]) {
      let curId = array.length;
      while ( 0 !== curId ) {
         let randId = Math.floor(Math.random() * curId);
         curId -= 1;
         let tmp = array[curId];
         array[curId] = array[randId];
         array[randId] = tmp;
      }
      return array;
   }

   private createRange(start: number, end: number) {
      const range = [];
      for ( let i = start; i <= end; i++ ) {
         range.push(i);
      }
      return range;
   }

   public multiply(a: number, b: number): number {
      return a * b;
   }
}

