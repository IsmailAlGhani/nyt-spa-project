import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchParams } from "@/types/article";

interface SearchState {
  searchQuery: string;
  searchParams: SearchParams;
  recentSearches: string[];
  setSearchQuery: (query: string) => void;
  setSearchParams: (params: Partial<SearchParams>) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      searchQuery: "",
      searchParams: {
        q: "",
        page: 0,
        sort: "newest",
      },
      recentSearches: [],

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSearchParams: (params: Partial<SearchParams>) => {
        set((state) => ({
          searchParams: { ...state.searchParams, ...params },
        }));
      },

      addRecentSearch: (query: string) => {
        if (!query.trim()) return;

        set((state) => {
          const filtered = state.recentSearches.filter(
            (search) => search.toLowerCase() !== query.toLowerCase(),
          );
          return {
            recentSearches: [query, ...filtered].slice(0, 10), // Keep only 10 recent searches
          };
        });
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: "nyt-search-store",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    },
  ),
);
