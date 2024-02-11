import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).not.toHaveBeenCalledTimes(0);
    expect(mockTwo).not.toHaveBeenCalledTimes(0);
    expect(mockThree).not.toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();

    unmockedFunction();

    expect(console.log).toHaveBeenCalledWith('I am not mocked');

    console.log = originalConsoleLog;
  });
});