'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function EnhancedCodeBlock({
  code,
  language = 'javascript',
  filename,
}: EnhancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!', {
        icon: '✨',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <motion.div
      className="relative group my-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Card Effect */}
      <motion.div
        animate={{
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? -1 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden shadow-2xl border border-gray-800 dark:border-gray-700"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 dark:bg-gray-900/50 border-b border-gray-700 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                {filename}
              </span>
            )}
            <span className="px-2 py-1 text-xs font-semibold text-purple-400 bg-purple-900/30 rounded">
              {language}
            </span>
          </div>
          <motion.button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 bg-gray-700/50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-green-400" />
                  <span>Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Code Content */}
        <div className="relative overflow-x-auto">
          <pre className="p-4 text-sm leading-relaxed font-mono">
            <code className={`language-${language}`}>{code}</code>
          </pre>
          
          {/* Glowing accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Floating particles effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full"
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: -20,
                  x: Math.sin(i) * 20,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

