'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Route, Wrench, Briefcase, Trophy, Mail, Moon, Sun, BookOpen } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero', icon: Home, isHash: true },
  { label: 'Journey', href: '#journey', icon: Route, isHash: true },
  { label: 'Skills', href: '#skills', icon: Wrench, isHash: true },
  { label: 'Projects', href: '#projects', icon: Briefcase, isHash: true },
  { label: 'Experience', href: '#experience', icon: Trophy, isHash: true },
  { label: 'Blog', href: '/blog', icon: BookOpen, isHash: false },
  { label: 'Contact', href: '#contact', icon: Mail, isHash: true }
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    // Update active hash on scroll
    const updateActiveHash = () => {
      const sections = navItems
        .filter(item => item.isHash)
        .map(item => item.href.replace('#', ''));
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveHash(`#${currentSection}`);
      }
    };

    if (pathname === '/') {
      updateActiveHash();
      window.addEventListener('scroll', updateActiveHash);
      return () => window.removeEventListener('scroll', updateActiveHash);
    }
  }, [pathname]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHash(href);
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isHash) {
      // If we're on a different page, navigate to home first with hash
      if (pathname !== '/') {
        window.location.href = `/${item.href}`;
      } else {
        scrollToSection(item.href);
      }
    }
    // For non-hash links (like /blog), Link component handles navigation
  };

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-[100] pointer-events-none px-4">
      <div className="pointer-events-auto flex justify-center max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-full px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && (
                <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
              )}
              {item.isHash ? (
                <button
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                    pathname === '/' && activeHash === item.href
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-label={item.label}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                    pathname?.startsWith(item.href)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-label={item.label}
                  aria-current={pathname?.startsWith(item.href) ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
          
          {/* Separator */}
          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex-shrink-0"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

