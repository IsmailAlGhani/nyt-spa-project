"use client";

import { format } from "date-fns";
import type { Article } from "@/types/article";
import { useMemo } from "react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const handleClick = () => {
    window.open(article.web_url, "_blank", "noopener,noreferrer");
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
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Unknown date";
    }
  };

  const author = useMemo(
    () => article.byline?.original?.replace(/^By /i, "") || "Unknown author",
    [article],
  );

  return (
    <button
      type="button"
      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-base-200 text-left p-0"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </figure>
      )}
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {article.headline.main}
        </h2>
        <p className="text-sm text-base-content/70 line-clamp-3 mb-2">
          {article.snippet}
        </p>
        <div className="flex flex-col gap-1 text-xs text-base-content/60">
          <div className="flex items-center justify-between">
            <span className="font-medium">{author}</span>
            <span>{formatDate(article.pub_date)}</span>
          </div>
          {article.section_name && (
            <div className="flex items-center gap-2 mt-1">
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
