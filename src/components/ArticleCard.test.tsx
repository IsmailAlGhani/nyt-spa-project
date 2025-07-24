import { render, screen, fireEvent } from '@testing-library/react';
import ArticleCard from './ArticleCard';
import type { Article } from '@/types/article';
import { describe, it, expect, vi } from 'vitest';

describe('ArticleCard', () => {
  const article: Article = {
    web_url: 'https://example.com',
    snippet: 'This is a snippet',
    print_page: 1,
    print_section: 'A',
    source: 'NYT',
    multimedia: [],
    headline: { main: 'Test Headline' },
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

  it('renders headline and snippet', () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByText('Test Headline')).toBeInTheDocument();
    expect(screen.getByText('This is a snippet')).toBeInTheDocument();
  });

  it('opens article in new tab on click', () => {
    window.open = vi.fn();
    render(<ArticleCard article={article} />);
    fireEvent.click(screen.getByRole('button'));
    expect(window.open).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener,noreferrer',
    );
  });
});
