'use client';

import { useSearchStore } from '@/store/searchStore';

interface RecentSearchesProps {
  onSearchSelect: (query: string) => void;
}

const RecentSearches = ({ onSearchSelect }: RecentSearchesProps) => {
  const { recentSearches, clearRecentSearches } = useSearchStore();

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="card bg-base-100 w-full max-w-2xl shadow-sm">
      <div className="card-body p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recent Searches</h3>
          <button
            className="btn btn-ghost btn-xs"
            onClick={clearRecentSearches}
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="badge badge-outline hover:badge-primary cursor-pointer"
              onClick={() => onSearchSelect(search)}
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;
