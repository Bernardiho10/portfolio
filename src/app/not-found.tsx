'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate 404 number
      tl.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.5, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 1 }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      // Floating animation for 404
      gsap.to(numberRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gold-50 via-white to-royal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full md:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* 404 Number */}
          <div ref={numberRef} className="mb-8 opacity-0">
            <h1 className="text-9xl sm:text-[12rem] lg:text-[16rem] font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-royal-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div ref={textRef} className="mb-12 opacity-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Oops! Looks like you've taken a wrong turn on the journey. The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-500">
              <Search className="w-5 h-5" />
              <p className="text-sm">
                Error Code: 404 | Page Not Found
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
            <Link
              href="/"
              className="group px-8 py-4 bg-gradient-to-r from-gold-500 to-royal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-gold-400 dark:border-gold-600 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Looking for something specific? Try these:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#journey"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors underline"
              >
                My Journey
              </Link>
              <Link
                href="/#projects"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors underline"
              >
                Projects
              </Link>
              <Link
                href="/#skills"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors underline"
              >
                Skills
              </Link>
              <Link
                href="/#experience"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors underline"
              >
                Experience
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors underline"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Fun Message */}
          <div className="mt-8">
            <p className="text-sm text-gray-400 dark:text-gray-600 italic">
              "Not all who wander are lost... but this page definitely is." 🚗💨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



