'use client';

import { useMemo, useState } from 'react';
import { ArticleFeed } from './ArticleFeed';
import { CategoryFilter } from './CategoryFilter';

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

interface BlogPageClientProps {
  initialArticles: Article[];
  categories: string[];
}

export function BlogPageClient({
  initialArticles,
  categories,
}: BlogPageClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Calculate article counts per category
  const articleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((category) => {
      counts[category] = initialArticles.filter((article) =>
        article.tags?.includes(category)
      ).length;
    });
    return counts;
  }, [initialArticles, categories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearAll={handleClearAll}
          articleCounts={articleCounts}
        />
      )}

      {/* Article Feed */}
      <ArticleFeed
        initialArticles={initialArticles}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}

