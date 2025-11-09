'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyStages } from '@/data/journey';

gsap.registerPlugin(ScrollTrigger);

// Vehicle emoji mapping
const vehicleEmojis = {
  bicycle: '🚴',
  car: '🚗',
  tesla: '🚗⚡',
  plane: '✈️'
};

export function JourneyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the rope path drawing
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.fromTo(
          pathRef.current,
          { strokeDashoffset: pathLength, strokeDasharray: `${pathLength} ${pathLength}` },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 1
            }
          }
        );
      }

      // Animate each stage
      stagesRef.current.forEach((stage, index) => {
        if (stage) {
          gsap.fromTo(
            stage,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              scale: 0.8
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Animate vehicle icon
          const vehicle = stage.querySelector('.vehicle-icon');
          if (vehicle) {
            gsap.to(vehicle, {
              y: -10,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: stage,
                start: 'top 80%'
              }
            });
          }
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={timelineRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="w-full md:w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gold-600 to-royal-600 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From humble beginnings to building the future of Nigerian tech - a journey of growth, innovation, and impact.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto pb-20">
          {/* Christmas Dotted Thread - Connecting each journey stage */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -ml-0.5 hidden lg:block">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2 1000" xmlns="http://www.w3.org/2000/svg" style={{ height: '100%' }}>
              <defs>
                {/* Christmas gradient - alternating red and green */}
                <linearGradient id="christmasGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" /> {/* Red */}
                  <stop offset="20%" stopColor="#16a34a" /> {/* Green */}
                  <stop offset="40%" stopColor="#dc2626" /> {/* Red */}
                  <stop offset="60%" stopColor="#16a34a" /> {/* Green */}
                  <stop offset="80%" stopColor="#dc2626" /> {/* Red */}
                  <stop offset="100%" stopColor="#16a34a" /> {/* Green */}
                </linearGradient>
                
                {/* Sparkle pattern for festive effect */}
                <pattern id="christmasSparkle" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#fbbf24" opacity="0.6">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </pattern>
                
                {/* Glow filter for festive shine */}
                <filter id="christmasGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main dotted line - Christmas themed */}
              <path
                ref={pathRef}
                d="M 1 0 L 1 1000"
                stroke="url(#christmasGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 14"
                vectorEffect="non-scaling-stroke"
                filter="url(#christmasGlow)"
                style={{
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                }}
              />
              
              {/* Secondary dotted line for depth */}
              <path
                d="M 1 0 L 1 1000"
                stroke="url(#christmasGradient)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 20"
                vectorEffect="non-scaling-stroke"
                opacity="0.6"
                style={{
                  strokeLinecap: 'round'
                }}
              />
            </svg>
          </div>

          {/* Journey Stages */}
          <div className="space-y-12 lg:space-y-24 relative">
            {journeyStages.map((stage, index) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stagesRef.current[index] = el;
                }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Christmas Ornament Connection Point */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center">
                  {/* Ornament bauble */}
                  <div className="relative group">
                    {/* Ornament hook */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-sm"></div>
                    
                    {/* Main ornament - alternating red and green */}
                    <div className={`w-7 h-7 rounded-full shadow-xl transition-all duration-300 group-hover:scale-110 ${
                      index % 2 === 0 
                        ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 border-2 border-red-300 shadow-red-500/50' 
                        : 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 border-2 border-green-300 shadow-green-500/50'
                    }`}>
                      {/* Highlight shine */}
                      <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-white/70 rounded-full blur-[2px]"></div>
                      
                      {/* Center star/decoration */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] animate-pulse">✨</span>
                      </div>
                      
                      {/* Reflective shine */}
                      <div className="absolute top-0.5 right-1 w-1 h-1 bg-white/80 rounded-full"></div>
                    </div>
                    
                    {/* Subtle pulsing glow effect */}
                    <div className={`absolute inset-0 rounded-full blur-lg opacity-40 animate-pulse ${
                      index % 2 === 0 ? 'bg-red-400' : 'bg-green-400'
                    }`}></div>
                    
                    {/* Outer glow ring */}
                    <div className={`absolute -inset-1 rounded-full border-2 opacity-30 ${
                      index % 2 === 0 ? 'border-red-300' : 'border-green-300'
                    }`}></div>
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="w-full lg:w-5/12">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-blue-200 dark:border-gray-600">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{stage.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {stage.year}
                        </p>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {stage.subtitle}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>

                 {/* Center Vehicle Icon - Curved Road Design */}
                <div className="w-full lg:w-2/12 flex justify-center">
                  <div className="vehicle-icon relative w-48 h-32 lg:w-56 lg:h-36">
                    {/* Curved Road */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl overflow-hidden transform perspective-1000">
                      {/* Road surface texture */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
                      
                      {/* Curved road markings */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
                        <path
                          d="M 20 75 Q 100 60, 180 75"
                          stroke="#fbbf24"
                          strokeWidth="3"
                          strokeDasharray="15 10"
                          fill="none"
                          opacity="0.7"
                        />
                      </svg>
                      
                      {/* Road edges - curved */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
                        <path
                          d="M 10 40 Q 100 25, 190 40"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.3"
                        />
                        <path
                          d="M 10 110 Q 100 125, 190 110"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.3"
                        />
                      </svg>
                    </div>
                    
                    {/* Vehicle moving on road - facing content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span 
                        className={`text-6xl lg:text-7xl drop-shadow-2xl animate-vehicle-move-delayed z-10 ${
                          stage.iconDirection === 'left' ? 'scale-x-[-1]' : 
                          stage.iconDirection === 'right' ? '' : 
                          (index % 2 === 0 ? '' : 'scale-x-[-1]')
                        }`}
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
                      >
                        {vehicleEmojis[stage.vehicle]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to build the next chapter together?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-gold-500 to-royal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </section>
  );
}

