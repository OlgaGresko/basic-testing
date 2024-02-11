import { simpleCalculator, Action } from "01-simple-tests";

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({a: 2, b: 2, action: Action.Add})
    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({a: 5, b: 2, action: Action.Subtract})
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({a: 6, b: 2, action: Action.Multiply})
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({a: 3, b: 3, action: Action.Divide})
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({a: 4, b: 2, action: Action.Exponentiate})
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({a: 4, b: 2, action: 'unknown'})
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({a: 'unknown', b: 2, action: Action.Add})
    expect(result).toBeNull();
  });
});
