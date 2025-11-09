"use client";

import { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string | null;
  publishDate: string;
  tags: string[] | null;
  readingTime: number;
  upvoteCount: number;
  views: number;
}

interface ArticleFeedProps {
  initialArticles?: Article[];
  initialPage?: number;
  selectedCategories?: string[];
}

export function ArticleFeed({
  initialArticles = [],
  initialPage = 1,
  selectedCategories = [],
}: ArticleFeedProps) {
  const [allArticles, setAllArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filter articles based on selected categories
  const articles = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allArticles;
    }
    return allArticles.filter((article) => {
      if (!article.tags || article.tags.length === 0) {
        return false;
      }
      // Article must have at least one of the selected categories
      return selectedCategories.some((category) =>
        article.tags?.includes(category)
      );
    });
  }, [allArticles, selectedCategories]);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (initialArticles.length > 0) {
      setAllArticles(initialArticles);
      setHasMore(initialArticles.length === 10); // Assuming 10 per page
      setPage(1); // Reset page when initial articles change
    }
  }, [initialArticles]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreArticles();
    }
  }, [inView, hasMore, loading]);

  const loadMoreArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/articles?page=${page + 1}&limit=10`);
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        setAllArticles((prev) => [...prev, ...data.articles]);
        setPage((prev) => prev + 1);
        setHasMore(data.pagination.page < data.pagination.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading articles:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  if (articles.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {selectedCategories.length > 0
            ? `No articles found in ${selectedCategories.join(', ')}. Try selecting different categories.`
            : 'No articles found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            {...article}
            publishDate={new Date(article.publishDate)}
          />
        ))}
        {loading && (
          <>
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </>
        )}
      </div>
      {hasMore && !loading && <div ref={ref} className="h-10" />}
      {!hasMore && articles.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You&apos;ve reached the end!</p>
        </div>
      )}
    </div>
  );
}

