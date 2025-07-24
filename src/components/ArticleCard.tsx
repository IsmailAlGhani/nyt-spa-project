'use client';

import { format } from 'date-fns';
import type { Article } from '@/types/article';
import { useMemo } from 'react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const handleClick = () => {
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  const imageUrl = useMemo(() => {
    if (article.multimedia && article.multimedia.length > 0) {
      const media = article.multimedia[0];
      if (media.default?.url) {
        return `https://static01.nyt.com/${media.default.url}`;
      }
      if (media.thumbnail?.url) {
        return `https://static01.nyt.com/${media.thumbnail.url}`;
      }
    }
    return null;
  }, [article]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Unknown date';
    }
  };

  const author = useMemo(
    () => article.byline?.original?.replace(/^By /i, '') || 'Unknown author',
    [article],
  );

  return (
    <button
      type="button"
      className="card bg-base-100 group border-base-200 cursor-pointer border p-0 text-left shadow-md transition-shadow hover:shadow-lg"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      tabIndex={0}
    >
      {imageUrl && (
        <figure className="aspect-video overflow-hidden rounded-t-xl">
          <img
            src={imageUrl}
            alt={article.headline.main}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </figure>
      )}
      <div className="card-body p-4">
        <h2 className="card-title group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
          {article.headline.main}
        </h2>
        <p className="text-base-content/70 mb-2 line-clamp-3 text-sm">
          {article.snippet}
        </p>
        <div className="text-base-content/60 flex flex-col gap-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium">{author}</span>
            <span>{formatDate(article.pub_date)}</span>
          </div>
          {article.section_name && (
            <div className="mt-1 flex items-center gap-2">
              <span className="badge badge-outline badge-sm">
                {article.section_name}
              </span>
              {article.print_section && (
                <span className="badge badge-ghost badge-sm">
                  {article.print_section}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ArticleCard;
