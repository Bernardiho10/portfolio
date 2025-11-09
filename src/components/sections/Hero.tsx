'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { personalInfo } from '@/data/personal-info';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for sequential animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate elements in sequence
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      // Floating animation for profile image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToJourney = () => {
    const element = document.querySelector('#journey');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, href: personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Twitter, href: `https://x.com/${personalInfo.twitter.replace('@', '')}`, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', color: 'hover:text-red-500' }
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gold-50 via-white to-royal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full md:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 opacity-0"
            >
              <span className="bg-gradient-to-r from-gold-500 via-gold-400 to-royal-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4 opacity-0"
            >
              {personalInfo.title}
            </p>

            <p
              ref={taglineRef}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto lg:mx-0 opacity-0"
            >
              {personalInfo.tagline}
            </p>

            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 opacity-0" ref={bioRef}>
              <p className="mb-3">
                Seasoned developer with <strong>6+ years</strong> of experience in planning, designing, and deploying web applications. I specialize in building responsive, user-friendly websites using modern technologies including <strong>Next.js, React, Node.js, Python</strong>, and more.
              </p>
              <p className="mb-3">
                I focus on creating seamless user experiences and efficient backend systems, with a proven track record of delivering high-quality projects on time and within budget. Collaborating with diverse businesses, I enhance their online presence through full-stack development.
              </p>
              <p>
                <strong>Microsoft Certified:</strong> Azure AI Fundamentals & Azure AI Engineer Associate | Currently pursuing AI Solutions Expert certification. Committed to continuous learning and growth in technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 opacity-0">
              <button
                onClick={scrollToJourney}
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-royal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Explore My Journey
              </button>
              <a
                href="#contact"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-gold-400 dark:border-gold-600"
              >
                Let&apos;s Connect
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-4 justify-center lg:justify-start opacity-0">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${link.color} transition-all duration-300 transform hover:scale-110`}
                  aria-label={link.label}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500 to-royal-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gold-400 dark:border-gold-600 shadow-2xl">
                <Image
                  src="/me.png"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 animate-pulse">
            Navigation menu at bottom ↓
          </p>
          <button
            onClick={scrollToJourney}
            className="animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

