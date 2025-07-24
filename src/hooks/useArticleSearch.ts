import { useInfiniteQuery } from "@tanstack/react-query";
import { searchArticles } from "@/services/nytApi";
import type { SearchParams, SearchResponse } from "@/types/article";

export const useArticleSearch = (params: SearchParams, enabled = true) => {
  return useInfiniteQuery<
    SearchResponse,
    Error,
    SearchResponse,
    [string, string?, string?, string?, string?, string?],
    number
  >({
    queryKey: [
      "articles",
      params.q,
      params.sort,
      params.begin_date,
      params.end_date,
      params.fq,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return searchArticles({ ...params, page: pageParam });
    },
    enabled: enabled && !!params.q.trim(),
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = lastPage?.response?.metadata?.hits || 0;
      const loaded = allPages.reduce(
        (acc, page) => acc + (page?.response?.docs?.length || 0),
        0,
      );
      if (
        loaded < totalResults &&
        (lastPage?.response?.docs?.length || 0) === 10
      ) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};
