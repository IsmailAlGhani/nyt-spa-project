import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useArticleSearch } from './useArticleSearch';
import * as nytApi from '@/services/nytApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { SearchResponse, Article } from '@/types/article';

const mockArticle: Article = {
  web_url: 'url',
  snippet: 'snippet',
  print_page: 1,
  print_section: 'A',
  source: 'NYT',
  multimedia: [],
  headline: { main: 'headline' },
  keywords: [],
  pub_date: '2024-06-01T00:00:00Z',
  document_type: 'article',
  desk: 'News',
  section_name: 'World',
  byline: { original: 'By John Doe' },
  type_of_material: 'News',
  word_count: 100,
  uri: 'nyt://article/123',
};

const mockResponse: InfiniteData<SearchResponse> = {
  pages: [
    {
      status: 'OK',
      copyright: 'Copyright',
      response: {
        docs: [mockArticle],
        metadata: { hits: 1, offset: 0, time: 1 },
      },
    },
  ],
  pageParams: [0],
};

describe('useArticleSearch', () => {
  beforeEach(() => {
    vi.spyOn(nytApi, 'searchArticles').mockResolvedValue(mockResponse.pages[0]);
  });

  it('fetches articles when query is provided', async () => {
    const queryClient = new QueryClient();
    function wrapper({ children }: { children: React.ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    }
    const { result } = renderHook(
      () => useArticleSearch({ q: 'test', page: 0, sort: 'newest' }, true),
      { wrapper },
    );
    await waitFor(() => {
      // Type guard: check if data and pages exist
      expect(result.current.data).toBeDefined();
      if (
        result.current.data &&
        'pages' in result.current.data &&
        Array.isArray(result.current.data.pages)
      ) {
        expect(
          result.current.data.pages[0].response.docs[0].headline.main,
        ).toBe('headline');
      } else {
        throw new Error(
          'InfiniteData structure not found in result.current.data',
        );
      }
    });
  });
});
