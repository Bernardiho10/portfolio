'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArticleSidebar } from './ArticleSidebar';
import { EnhancedCodeBlock } from './EnhancedCodeBlock';
import { PullQuote } from './PullQuote';
import { TagCloud } from './TagCloud';

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface RelatedArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string | null;
}

interface ArticleBodyProps {
  content: string;
  tags?: string[];
  tableOfContents?: TableOfContentsItem[];
  relatedArticles?: RelatedArticle[];
  currentSlug?: string;
}

// Extract headings from HTML content to build TOC
function extractHeadings(html: string): TableOfContentsItem[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h[2-3]>/g;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    // Extract text content from HTML (remove any nested tags)
    const textContent = match[3].replace(/<[^>]*>/g, '').trim();
    if (textContent) {
      headings.push({
        id: match[2] || textContent.toLowerCase().replace(/\s+/g, '-'),
        text: textContent,
        level: parseInt(match[1], 10),
      });
    }
  }

  // Fallback: extract headings without IDs
  if (headings.length === 0) {
    const fallbackRegex = /<h([2-3])[^>]*>([\s\S]*?)<\/h[2-3]>/g;
    while ((match = fallbackRegex.exec(html)) !== null) {
      const textContent = match[2].replace(/<[^>]*>/g, '').trim();
      if (textContent) {
        const id = textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
        headings.push({
          id,
          text: textContent,
          level: parseInt(match[1], 10),
        });
      }
    }
  }

  return headings;
}

// Enhance HTML content with custom components
function enhanceContent(html: string): string {
  let enhanced = html;

  // Wrap code blocks for enhanced rendering
  enhanced = enhanced.replace(
    /<pre><code[^>]*class="language-([^"]*)"[^>]*>([\s\S]*?)<\/code><\/pre>/g,
    (match, lang, code) => {
      const cleanedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim();
      return `<div data-enhanced-code-block data-language="${lang}">${cleanedCode}</div>`;
    }
  );

  // Wrap blockquotes for pull quotes
  enhanced = enhanced.replace(
    /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g,
    (match, content) => {
      return `<div data-enhanced-pullquote>${content}</div>`;
    }
  );

  return enhanced;
}

export function ArticleBody({
  content,
  tags,
  tableOfContents: providedTOC,
  relatedArticles,
  currentSlug,
}: ArticleBodyProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [enhancedContent, setEnhancedContent] = useState(content);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    providedTOC || []
  );

  useEffect(() => {
    // Enhance content and extract headings
    const enhanced = enhanceContent(content);
    setEnhancedContent(enhanced);

    // Extract headings if not provided
    if (!providedTOC || providedTOC.length === 0) {
      const headings = extractHeadings(content);
      setTableOfContents(headings);
    }
  }, [content, providedTOC]);

  useEffect(() => {
    // Process enhanced code blocks after render
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll(
        '[data-enhanced-code-block]'
      );
      codeBlocks.forEach((block) => {
        // Code blocks will be handled by the prose styles
        // This is a placeholder for future enhancement
      });
    }
  }, [enhancedContent]);

  // Add intersection observer for heading animations
  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h2, h3');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '-100px 0px',
        }
      );

      headings.forEach((heading) => observer.observe(heading));

      return () => {
        headings.forEach((heading) => observer.unobserve(heading));
      };
    }
  }, [enhancedContent]);

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-16">
          {/* Main Content */}
          <motion.article
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="article-content max-w-none"
            dangerouslySetInnerHTML={{ __html: enhancedContent }}
          />

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block">
            <ArticleSidebar
              tableOfContents={tableOfContents}
              relatedArticles={relatedArticles}
              currentSlug={currentSlug}
            />
          </aside>
        </div>

        {/* Mobile Sidebar - Bottom sheet style */}
        {tableOfContents.length > 0 && (
          <div className="lg:hidden mt-8">
            <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </summary>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    style={{ paddingLeft: `${item.level * 12 + 12}px` }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <TagCloud tags={tags} />
          </div>
        )}
      </div>
    </section>
  );
}

