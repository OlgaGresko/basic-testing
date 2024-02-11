import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs/promises', () => ({
  ...jest.requireActual('fs/promises'),
  readFile: jest.fn(),
}));

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout / 2);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout / 2);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';

  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(require('path'), 'join');

    (require('fs').existsSync as jest.Mock).mockReturnValueOnce(true);
    (require('fs/promises').readFile as jest.Mock).mockImplementationOnce(async () => Buffer.from('Test'));

    await readFileAsynchronously(pathToFile);

    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (require('fs').existsSync as jest.Mock).mockReturnValueOnce(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Test';
    
    (require('fs').existsSync as jest.Mock).mockReturnValueOnce(true);
    (require('fs/promises').readFile as jest.Mock).mockImplementationOnce(async () => Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
