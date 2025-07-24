import { useSearchParams } from 'react-router';
import SearchForm from '@/components/SearchForm';
import RecentSearches from '@/components/RecentSearches';
import { useSearchStore } from '@/store/searchStore';
import { useCallback, useEffect, useRef } from 'react';
import { useArticleSearch } from '@/hooks/useArticleSearch';
import type { InfiniteData } from '@tanstack/react-query';
import type { Article, SearchResponse } from '@/types/article';
import ArticleList from '@/components/ArticleList';

const HomePage = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { addRecentSearch } = useSearchStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const q = urlSearchParams.get('q') || '';

  const searchParams = { q, page: 0, sort: 'newest' as const };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useArticleSearch(searchParams, !!q);

  const handleUpdateSearch = (query: string) => {
    addRecentSearch(query);
    setUrlSearchParams({ q: query });
  };

  const loadMore = useCallback(() => {
    if (!hasNextPage || isLoading || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  const infiniteData = data as InfiniteData<SearchResponse> | undefined;
  const articles: Article[] =
    infiniteData?.pages?.flatMap((page) => page?.response?.docs || []) || [];
  const totalResults = infiniteData?.pages?.[0]?.response?.metadata?.hits || 0;

  // Infinite scroll effect
  // (no need to manage articles state, handled by useInfiniteQuery)

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        !containerRef.current ||
        isLoading ||
        isFetchingNextPage ||
        !hasNextPage
      )
        return;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, isLoading, isFetchingNextPage, hasNextPage]);

  return (
    <div
      className="flex w-full flex-col items-center gap-y-4 px-4 md:mx-auto"
      ref={containerRef}
    >
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Discover <span className="text-primary">NYT</span> Articles
        </h1>
        <p className="text-base-content/70 mx-auto mb-8 max-w-2xl text-lg">
          Search through millions of articles from The New York Times. Find
          breaking news, in-depth analysis, and expert opinions on topics that
          matter to you.
        </p>
      </div>
      <SearchForm
        size="lg"
        placeholder="What would you like to read about?"
        onSearch={handleUpdateSearch}
      />

      <RecentSearches onSearchSelect={handleUpdateSearch} />

      <ArticleList
        articles={articles}
        isLoading={isLoading}
        error={error}
        totalResults={totalResults}
      />
      {isFetchingNextPage && (
        <div className="my-6 flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
      {!hasNextPage && articles.length > 0 && (
        <div className="text-base-content/60 my-6 text-center">
          No more articles to load.
        </div>
      )}
    </div>
  );
};

export default HomePage;
