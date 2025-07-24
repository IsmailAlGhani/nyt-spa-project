import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from './SearchForm';
import { MemoryRouter } from 'react-router';

describe('SearchForm', () => {
  it('renders input and button', () => {
    render(
      <MemoryRouter>
        <SearchForm onSearch={() => {}} />
      </MemoryRouter>,
    );
    expect(
      screen.getByPlaceholderText('Search articles...'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with input value', () => {
    const onSearch = vi.fn();
    render(
      <MemoryRouter>
        <SearchForm onSearch={onSearch} />
      </MemoryRouter>,
    );
    const input = screen.getByPlaceholderText('Search articles...');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('React');
  });
});
