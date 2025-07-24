'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSearchStore } from '@/store/searchStore';

interface SearchFormProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SearchForm = ({
  onSearch,
  placeholder = 'Search articles...',
  size = 'md',
}: SearchFormProps) => {
  const { addRecentSearch } = useSearchStore();
  const [urlSearchParams] = useSearchParams();
  const q = urlSearchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    setLocalQuery(q);
  }, [q]);

  const handleSubmit = () => {
    if (!localQuery.trim()) return;

    addRecentSearch(localQuery);

    onSearch(localQuery);
  };

  const inputSize = {
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
  }[size];

  const buttonSize = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  }[size];

  return (
    <div className="flex w-full max-w-2xl items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        className={`input input-bordered flex-1 ${inputSize}`}
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value || '')}
      />
      <button
        type="submit"
        className={`btn btn-primary ${buttonSize}`}
        disabled={!localQuery.trim()}
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;
