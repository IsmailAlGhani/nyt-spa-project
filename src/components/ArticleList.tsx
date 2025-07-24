import ArticleCard from '@/components/ArticleCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import type { Article } from '@/types/article';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  totalResults?: number;
}

const ArticleList = ({
  articles,
  isLoading,
  error,
  totalResults,
}: ArticleListProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">📰</div>
        <h3 className="mb-2 text-xl font-semibold">No articles found</h3>
        <p className="text-base-content/60">
          Try adjusting your search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-0 md:px-4">
      {totalResults && (
        <div className="text-base-content/60 text-sm">
          Found {totalResults.toLocaleString()} articles
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.web_url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
