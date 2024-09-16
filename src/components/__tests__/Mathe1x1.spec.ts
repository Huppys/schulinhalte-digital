import { vitest } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { describe, test, expect, beforeAll } from "vitest";
import { Mathe1x1Helper } from "../math/Mathe1x1Helper";

describe("Mathe 1x1", () => {
  let matheHelper: Mathe1x1Helper;

  beforeAll(() => {
    createTestingPinia({ createSpy: vitest.fn });
    matheHelper = new Mathe1x1Helper();
  });

  test("should return random value between 2 and 9 inclusive", () => {
    const maxRuns = 100;

    for (let i = 0; i < maxRuns; i++) {
      const factors = matheHelper.getShuffledFactors(10);

      factors.forEach((pair: [number, number]) => {
        expect(pair[0]).toBeGreaterThanOrEqual(2);
        expect(pair[0]).toBeLessThanOrEqual(9);
      });
    }
  });

  test("should multiply both factors and return product", () => {
    const factor1 = 2;
    const factor2 = 3;
    expect(matheHelper.multiply(factor1, factor2)).toEqual(6);
  });

  test.skip("should log distribution of factors", () => {
    const maxRuns = 100;

    const mainFactorDistribution: Map<number, number> = new Map<
      number,
      number
    >();

    for (let i = 0; i < maxRuns; i++) {
      const factors = matheHelper.getShuffledFactors(10);

      const mapKey: number = factors[0][0];
      if (!mainFactorDistribution.has(mapKey)) {
        mainFactorDistribution.set(mapKey, 1);
      } else {
        const value: number | undefined = mainFactorDistribution.get(mapKey);
        if (value !== undefined) {
          mainFactorDistribution.set(mapKey, value + 1);
        }
      }
    }
    console.log(mainFactorDistribution);
  });
});
