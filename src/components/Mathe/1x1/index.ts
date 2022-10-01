export function getRandomFactor() {
   return Math.ceil(Math.random() * 10);
}

export function shuffleNumbers(array: number[]) {
   let curId = array.length;
   while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
   }
   return array;
}

export function createRange(start: number, end: number) {
   const range = [];
   for (let i = start; i <= end; i++) {
      range.push(i);
   }
   return range;
}

export function multiply(a: number, b: number): number {
   return a * b;
}