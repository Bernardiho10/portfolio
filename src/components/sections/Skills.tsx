'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, skillsByCategory } from '@/data/skills';

gsap.registerPlugin(ScrollTrigger);

const categoryLabels = {
  frontend: 'Frontend Development',
  backend: 'Backend & APIs',
  database: 'Database & Storage',
  devops: 'DevOps & Testing',
  ai: 'AI & Machine Learning',
  other: 'Other Technologies'
};

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-purple-500 to-pink-500',
  devops: 'from-orange-500 to-red-500',
  ai: 'from-indigo-500 to-purple-500',
  other: 'from-gray-500 to-slate-500'
};

export function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoriesRef.current.forEach((category, index) => {
        if (category) {
          const skillCards = category.querySelectorAll('.skill-card');
          
          gsap.fromTo(
            skillCards,
            {
              opacity: 0,
              y: 50,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const renderProficiency = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-gold-50 to-royal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="w-full md:w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gold-600 to-royal-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specialized in MERN stack development with expertise in frontend engineering and intermediate backend skills
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills], catIndex) => {
            if (categorySkills.length === 0) return null;
            
            return (
              <div
                key={category}
                ref={(el) => {
                  categoriesRef.current[catIndex] = el;
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${categoryColors[category as keyof typeof categoryColors]}`}></div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {categorySkills.length} skills
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-card group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                          {skill.icon}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                          {skill.name}
                        </p>
                        {renderProficiency(skill.proficiency)}
                      </div>
                      
                      {/* Hover gradient border effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} opacity-0 group-hover:opacity-20 transition-opacity -z-10`}></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              6+
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {skills.length}+
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Technologies</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              10+
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Projects Delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}

