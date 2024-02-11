// import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const THROTTLE_TIME = 5000;
    const expectedPath = '/some-path';
    const baseURL = 'https://jsonplaceholder.typicode.com';

    (require('axios').create as jest.Mock).mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({ data: 'some data' }),
    });

    jest.advanceTimersByTime(THROTTLE_TIME - 1);

    await throttledGetDataFromApi(expectedPath);

    expect(require('axios').create).toHaveBeenCalledWith({
      baseURL: baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});