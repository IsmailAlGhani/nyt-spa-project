import axios from 'axios';
import type { SearchResponse, SearchParams } from '@/types/article';

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2';

if (!NYT_API_KEY) {
  console.warn(
    'NYT API Key is not configured. Please add VITE_NYT_API_KEY to your .env file',
  );
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function searchArticles(
  params: SearchParams,
): Promise<SearchResponse> {
  try {
    const response = await api.get('/articlesearch.json', {
      params: {
        'api-key': NYT_API_KEY,
        q: params.q,
        page: params.page || 0,
        sort: params.sort || 'newest',
        begin_date: params.begin_date,
        end_date: params.end_date,
        fq: params.fq,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      throw new Error(
        error.response?.data?.message || 'Failed to fetch articles',
      );
    }
    throw new Error('Network error occurred');
  }
}

export { api };
