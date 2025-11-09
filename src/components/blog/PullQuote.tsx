'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface PullQuoteProps {
  quote: string;
  author?: string;
}

export function PullQuote({ quote, author }: PullQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative my-12 mx-auto max-w-4xl"
    >
      {/* Glass card with blur backdrop */}
      <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        {/* Decorative quote marks */}
        <div className="absolute -top-4 -left-4 w-16 h-16 text-blue-500/20 dark:text-blue-400/20">
          <Quote className="w-full h-full" />
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 text-purple-500/20 dark:text-purple-400/20 rotate-180">
          <Quote className="w-full h-full" />
        </div>

        {/* Quote text */}
        <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white leading-relaxed italic">
          {quote}
        </blockquote>

        {/* Author */}
        {author && (
          <footer className="mt-6 text-center">
            <cite className="text-lg text-gray-600 dark:text-gray-400 not-italic font-medium">
              — {author}
            </cite>
          </footer>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

