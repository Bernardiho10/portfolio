'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Award, Code, Users, ChevronDown, ChevronUp, CheckCircle2, Trophy } from 'lucide-react';
import Image from 'next/image';
import { workExperience } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

const typeIcons = {
  work: Briefcase,
  hackathon: Award,
  opensource: Code,
  freelance: Users
};

const typeColors = {
  work: 'from-blue-500 to-cyan-500',
  hackathon: 'from-yellow-500 to-orange-500',
  opensource: 'from-green-500 to-emerald-500',
  freelance: 'from-purple-500 to-pink-500'
};

export function Experience() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: -50
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, experienceRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-gold-50 to-royal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="w-full md:w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gold-600 to-royal-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building scalable solutions and delivering impactful results across healthcare, education, and enterprise applications
          </p>
        </div>

        {/* Professional Work Experience */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {workExperience.map((exp, index) => {
              const Icon = typeIcons[exp.type];
              const colorClass = typeColors[exp.type];
              
              return (
                <div
                  key={exp.id}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Logo or Icon */}
                      <div className="flex-shrink-0">
                        {exp.logoUrl ? (
                          <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                            <Image
                              src={exp.logoUrl}
                              alt={`${exp.organization} logo`}
                              width={64}
                              height={74}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {exp.title}
                            </h3>
                            {exp.website ? (
                              <a 
                                href={exp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1 mb-2"
                              >
                                {exp.organization}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ) : (
                              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                                {exp.organization}
                              </p>
                            )}
                            {/* Company Description */}
                            {exp.companyDescription && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2 leading-relaxed">
                                {exp.companyDescription}
                              </p>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col items-start sm:items-end">
                            <span className="font-medium">{exp.period}</span>
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Expandable Details Button */}
                        {(exp.responsibilities || exp.keyAchievements) && (
                          <button
                            onClick={() => toggleExpand(exp.id)}
                            className="mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                          >
                            {expandedItems.has(exp.id) ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Hide Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                View Detailed Breakdown
                              </>
                            )}
                          </button>
                        )}

                        {/* Expanded Details */}
                        {expandedItems.has(exp.id) && (
                          <div className="mb-4 space-y-6 transition-all duration-300 ease-in-out">
                            {/* Responsibilities */}
                            {exp.responsibilities && exp.responsibilities.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2">
                                  {exp.responsibilities.map((responsibility, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                      <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
                                      <span className="leading-relaxed">{responsibility}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Key Achievements */}
                            {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                  <Trophy className="w-5 h-5 text-yellow-500" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {exp.keyAchievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                      <span className="text-yellow-500 mt-1.5 flex-shrink-0">★</span>
                                      <span className="leading-relaxed">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Technologies */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center relative">
          <div className="relative rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 animate-gradient-xy"></div>
            
            {/* Animated Blob Shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Floating Bubbles with Pop Effect */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/20 rounded-full animate-bubble-pop" style={{ animationDelay: '0s', animationDuration: '12s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/15 rounded-full animate-bubble-pop" style={{ animationDelay: '1s', animationDuration: '14s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white/25 rounded-full animate-bubble-pop" style={{ animationDelay: '2s', animationDuration: '13s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-white/18 rounded-full animate-bubble-pop" style={{ animationDelay: '0.5s', animationDuration: '15s' }}></div>
            <div className="absolute bottom-1/3 right-1/5 w-18 h-18 bg-white/22 rounded-full animate-bubble-pop" style={{ animationDelay: '1.5s', animationDuration: '11s' }}></div>
            <div className="absolute top-2/3 left-1/5 w-10 h-10 bg-white/15 rounded-full animate-bubble-pop" style={{ animationDelay: '2.5s', animationDuration: '13.5s' }}></div>
            <div className="absolute top-1/5 right-1/2 w-22 h-22 bg-white/20 rounded-full animate-bubble-pop" style={{ animationDelay: '0.8s', animationDuration: '14.5s' }}></div>
            <div className="absolute bottom-1/5 left-2/3 w-13 h-13 bg-white/18 rounded-full animate-bubble-pop" style={{ animationDelay: '1.8s', animationDuration: '12.2s' }}></div>
            <div className="absolute top-3/4 left-1/2 w-11 h-11 bg-white/16 rounded-full animate-bubble-pop" style={{ animationDelay: '3s', animationDuration: '12.8s' }}></div>
            <div className="absolute top-1/6 right-1/6 w-15 h-15 bg-white/19 rounded-full animate-bubble-pop" style={{ animationDelay: '0.3s', animationDuration: '13.3s' }}></div>
            <div className="absolute bottom-1/6 left-1/6 w-17 h-17 bg-white/21 rounded-full animate-bubble-pop" style={{ animationDelay: '1.2s', animationDuration: '14.2s' }}></div>
            <div className="absolute top-5/6 right-2/3 w-9 h-9 bg-white/14 rounded-full animate-bubble-pop" style={{ animationDelay: '2.2s', animationDuration: '11.5s' }}></div>
            <div className="absolute top-2/5 left-3/4 w-19 h-19 bg-white/23 rounded-full animate-bubble-pop" style={{ animationDelay: '0.7s', animationDuration: '13.7s' }}></div>
            <div className="absolute bottom-2/5 right-1/6 w-16 h-16 bg-white/17 rounded-full animate-bubble-pop" style={{ animationDelay: '1.7s', animationDuration: '12.7s' }}></div>
            <div className="absolute top-4/5 left-1/6 w-12 h-12 bg-white/15 rounded-full animate-bubble-pop" style={{ animationDelay: '2.7s', animationDuration: '14.7s' }}></div>
            <div className="absolute top-1/3 left-1/2 w-21 h-21 bg-white/24 rounded-full animate-bubble-pop" style={{ animationDelay: '0.4s', animationDuration: '11.8s' }}></div>
            <div className="absolute bottom-3/4 right-1/4 w-14 h-14 bg-white/18 rounded-full animate-bubble-pop" style={{ animationDelay: '1.4s', animationDuration: '13.4s' }}></div>
            <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white/13 rounded-full animate-bubble-pop" style={{ animationDelay: '2.4s', animationDuration: '12.4s' }}></div>
            <div className="absolute bottom-1/2 right-1/2 w-23 h-23 bg-white/22 rounded-full animate-bubble-pop" style={{ animationDelay: '0.6s', animationDuration: '14.6s' }}></div>
            <div className="absolute top-3/5 left-4/5 w-11 h-11 bg-white/16 rounded-full animate-bubble-pop" style={{ animationDelay: '1.6s', animationDuration: '11.6s' }}></div>
            
            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-lg rotate-45"></div>
              <div className="absolute top-12 right-8 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-8 left-12 w-24 h-24 border-2 border-white rounded-lg"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Let&apos;s Work Together
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed drop-shadow-md">
                Experienced in building scalable SaaS enterprise solutions. Available for consulting and collaboration opportunities.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-white text-royal-600 font-semibold rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

