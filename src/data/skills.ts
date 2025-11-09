import { Skill } from '@/types/portfolio';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', proficiency: 5, icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', proficiency: 5, icon: '📘' },
  { name: 'JavaScript', category: 'frontend', proficiency: 5, icon: '🟨' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 5, icon: '🎨' },
  { name: 'HTML5', category: 'frontend', proficiency: 5, icon: '📄' },
  { name: 'CSS3', category: 'frontend', proficiency: 5, icon: '🎨' },
  { name: 'React Native', category: 'frontend', proficiency: 4, icon: '📱' },
  { name: 'Expo', category: 'frontend', proficiency: 4, icon: '📱' },
  
  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 3, icon: '🟢' },
  { name: 'Python', category: 'backend', proficiency: 3, icon: '🐍' },
  { name: 'PHP', category: 'backend', proficiency: 2, icon: '🐘' },
  { name: 'Golang', category: 'backend', proficiency: 1, icon: '🐹' },
  
  // Database
  { name: 'PostgreSQL', category: 'database', proficiency: 3, icon: '🐘' },
  { name: 'MySQL', category: 'database', proficiency: 3, icon: '🐬' },
  { name: 'MongoDB', category: 'database', proficiency: 2, icon: '🍃' },
  { name: 'Redis', category: 'database', proficiency: 3, icon: '🔴' },
  
  // DevOps & Tools
  { name: 'Docker', category: 'devops', proficiency: 3, icon: '🐳' },
  { name: 'Git', category: 'devops', proficiency: 3, icon: '📦' },
  { name: 'GitHub Actions', category: 'devops', proficiency: 3, icon: '⚙️' },
  { name: 'Vercel', category: 'devops', proficiency: 2, icon: '▲' },
  { name: 'AWS', category: 'devops', proficiency: 2, icon: '☁️' },
  { name: 'Azure', category: 'devops', proficiency: 4, icon: '☁️' },
  { name: 'Jenkins', category: 'devops', proficiency: 2, icon: '🔧' },
  { name: 'Jest', category: 'devops', proficiency: 3, icon: '🃏' },

  // AI/ML
  { name: 'PyTorch', category: 'ai', proficiency: 1, icon: '🔥' },
  { name: 'Hugging Face', category: 'ai', proficiency: 4, icon: '🤗' },
  { name: 'LangChain', category: 'ai', proficiency: 1, icon: '🔗' },
  
  // Other
  { name: 'WordPress', category: 'other', proficiency: 5, icon: '📝' },
  { name: 'REST APIs', category: 'other', proficiency: 5, icon: '🔌' }
];

export const skillsByCategory = {
  frontend: skills.filter(s => s.category === 'frontend'),
  backend: skills.filter(s => s.category === 'backend'),
  database: skills.filter(s => s.category === 'database'),
  devops: skills.filter(s => s.category === 'devops'),
  ai: skills.filter(s => s.category === 'ai'),
  other: skills.filter(s => s.category === 'other')
};