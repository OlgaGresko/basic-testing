import { simpleCalculator, Action } from "02-table-tests";

const testCases = [
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 5, b: 2, action: Action.Subtract, expected: 3 },
    { a: 6, b: 2, action: Action.Multiply, expected: 12 },
    { a: 3, b: 3, action: Action.Divide, expected: 1 },
    { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
    { a: 4, b: 2, action: 'unknown', expected: null },
    { a: 'unknown', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform calculation with input %p', ({a, b, action, expected}) => {
      const result = simpleCalculator({a, b, action});
      expect(result).toBe(expected);
  });
});
