'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Calendar } from 'lucide-react';
import { personalInfo } from '@/data/personal-info';
import { certifications } from '@/data/experience';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Certification } from '@/types/portfolio';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`, label: 'LinkedIn' },
    { icon: Twitter, href: `https://x.com/${personalInfo.twitter.replace('@', '')}`, label: 'Twitter' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
    { icon: Calendar, href: personalInfo.calendly || '#', label: 'Schedule a Call' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Certifications Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certifications & Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={cert.badgeUrl}
                    alt={cert.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-sm text-center font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {cert.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {cert.issuer} • {cert.year}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view full certificate
                </p>
              </button>
            ))}
          </div>

          {/* Certificate Modal */}
          <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0">
              {selectedCert && (
                <>
                  <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-2xl font-bold">{selectedCert.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedCert.issuer} • {selectedCert.year}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="relative w-full bg-gray-50 dark:bg-gray-900 px-6 pb-6">
                    <div className="relative w-full h-auto rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                      <Image
                        src={selectedCert.badgeUrl}
                        alt={selectedCert.name}
                        width={1400}
                        height={1000}
                        className="w-full h-auto object-contain"
                        priority
                        quality={95}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 px-6 pb-6">
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      Verify Credential
                    </a>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {personalInfo.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {personalInfo.tagline}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              📍 {personalInfo.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Journey', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(`#${item.toLowerCase()}`);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Let&apos;s Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors group"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} {personalInfo.name}. Built with Next.js, TypeScript & GSAP.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Empowering Nigeria&apos;s Tech Ecosystem 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}

