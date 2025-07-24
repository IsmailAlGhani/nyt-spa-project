import { describe, it, expect } from 'vitest';
import { useSearchStore } from './searchStore';

describe('useSearchStore', () => {
  it('sets search query', () => {
    useSearchStore.getState().setSearchQuery('react');
    expect(useSearchStore.getState().searchQuery).toBe('react');
  });

  it('sets search params', () => {
    useSearchStore.getState().setSearchParams({ q: 'redux', page: 2 });
    expect(useSearchStore.getState().searchParams.q).toBe('redux');
    expect(useSearchStore.getState().searchParams.page).toBe(2);
  });

  it('adds and clears recent searches', () => {
    useSearchStore.getState().addRecentSearch('react');
    useSearchStore.getState().addRecentSearch('redux');
    expect(useSearchStore.getState().recentSearches[0]).toBe('redux');
    useSearchStore.getState().clearRecentSearches();
    expect(useSearchStore.getState().recentSearches).toHaveLength(0);
  });
});
