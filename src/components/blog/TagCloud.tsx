'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface TagCloudProps {
  tags: string[];
  colorMap?: Record<string, string>;
}

const defaultColors = {
  react: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  javascript: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  typescript: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20',
  performance: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  ui: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  default: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
};

export function TagCloud({ tags, colorMap }: TagCloudProps) {
  const getTagColor = (tag: string) => {
    const normalizedTag = tag.toLowerCase();
    return (
      defaultColors[normalizedTag as keyof typeof defaultColors] ||
      defaultColors.default
    );
  };

  return (
    <div className="flex flex-wrap gap-2 my-6">
      {tags.map((tag, index) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.05,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{
            scale: 1.1,
            rotateY: 15,
            rotateX: 5,
            z: 50,
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <Badge
            variant="outline"
            className={`px-4 py-2 text-sm font-medium cursor-pointer border-2 transition-all duration-300 ${getTagColor(
              tag
            )}`}
          >
            #{tag}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}

