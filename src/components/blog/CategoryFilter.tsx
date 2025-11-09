'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearAll: () => void;
  articleCounts?: Record<string, number>;
}

const categoryColors: Record<string, string> = {
  react: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
  javascript: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20',
  typescript: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20 hover:bg-blue-600/20',
  'next.js': 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20 hover:bg-gray-500/20',
  performance: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20',
  ui: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
  design: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 hover:bg-pink-500/20',
  tutorial: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/20',
  default: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20 hover:bg-gray-500/20',
};

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearAll,
  articleCounts = {},
}: CategoryFilterProps) {
  const getCategoryColor = (category: string) => {
    const normalized = category.toLowerCase().replace(/\s+/g, '-');
    return categoryColors[normalized] || categoryColors.default;
  };

  const isSelected = (category: string) => {
    return selectedCategories.includes(category);
  };

  const getArticleCount = (category: string) => {
    return articleCounts[category] || 0;
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 md:mb-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filter by Category
          </h2>
          {selectedCategories.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length} selected
            </Badge>
          )}
        </div>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {categories.map((category, index) => {
            const selected = isSelected(category);
            return (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryToggle(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  border-2 cursor-pointer flex items-center gap-2
                  ${selected
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/50'
                    : `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${getCategoryColor(category)}`
                  }
                `}
                aria-pressed={selected}
                aria-label={`${selected ? 'Deselect' : 'Select'} category ${category}`}
              >
                <span>#{category}</span>
                {getArticleCount(category) > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {getArticleCount(category)}
                  </span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Active filters display */}
      {selectedCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Showing articles in: {selectedCategories.join(', ')}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

