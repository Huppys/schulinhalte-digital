import { describe, test, expect } from 'vitest';
import { createRange, getRandomFactor, shuffleNumbers } from '../Mathe/1x1';


describe('Mathe 1x1', () => {
   test('should return random value between 1 and 10 inclusive', () => {
      const maxRuns = 1000;

      for ( let i = 0; i < maxRuns; i++ ) {
         const randomFactor = getRandomFactor();
         expect(randomFactor).toBeGreaterThanOrEqual(1);
         expect(randomFactor).toBeLessThanOrEqual(10);
      }
   });

   test('should return array with numbers in range', () => {
      const range = createRange(1, 3);
      expect(range).toEqual([1, 2, 3]);
   });

   test('should return shuffled range of numbers', () => {
      const range = createRange(1, 3);
      const shuffledRange = shuffleNumbers(range);
      expect(shuffledRange.sort()).toEqual(range);
   });
});