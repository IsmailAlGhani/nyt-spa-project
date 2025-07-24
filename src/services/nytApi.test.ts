import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { MockInstance } from 'vitest';
import { searchArticles, api } from './nytApi';
import type { SearchParams } from '@/types/article';
import axios from 'axios';

const params: SearchParams = { q: 'test', page: 0, sort: 'newest' };

describe('searchArticles', () => {
  let getSpy: MockInstance;
  let isAxiosErrorSpy: MockInstance;

  beforeEach(() => {
    getSpy = vi.spyOn(api, 'get');
    isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
  });

  afterEach(() => {
    getSpy.mockRestore();
    isAxiosErrorSpy.mockRestore();
  });

  it('returns data on success', async () => {
    getSpy.mockResolvedValue({ data: { foo: 'bar' } });
    isAxiosErrorSpy.mockReturnValue(false);
    const res = await searchArticles(params);
    expect(res).toEqual({ foo: 'bar' });
  });

  it('throws rate limit error', async () => {
    getSpy.mockRejectedValue({ response: { status: 429 } });
    await expect(searchArticles(params)).rejects.toThrow('Rate limit exceeded');
  });

  it('throws invalid key error', async () => {
    getSpy.mockRejectedValue({ response: { status: 401 } });
    await expect(searchArticles(params)).rejects.toThrow('Invalid API key');
  });

  it('throws network error', async () => {
    getSpy.mockRejectedValue({});
    isAxiosErrorSpy.mockReturnValue(false);
    await expect(searchArticles(params)).rejects.toThrow(
      'Network error occurred',
    );
  });
});

export { api };
