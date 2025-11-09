import { JourneyStage } from '@/types/portfolio';

export const journeyStages: JourneyStage[] = [
  {
    id: 'education',
    title: 'The Foundation',
    subtitle: 'University of Calabar',
    description: 'BSc Electronic Computer Technology. Learning the basics of computer systems, electronics, and software engineering.',
    vehicle: 'bicycle',
    year: '2005',
    icon: '🎓'
  },
  {
    id: 'junior-frontend',
    title: 'Junior Frontend Engineer',
    subtitle: 'Efiko Freelance Marketplace',
    description: 'Building responsive interfaces with React and JavaScript. Working on improving site performance and user experience through frontend development.',
    vehicle: 'bicycle',
    year: '2017-2019',
    icon: '🚴',
    iconDirection: 'left'
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    subtitle: 'BodymotionsPhysio',
    description: 'Working with Node.js and MongoDB to build server-side solutions. Creating automated scheduling systems and healthcare applications that handle patient data securely.',
    vehicle: 'car',
    year: '2019-2021',
    icon: '🚗',
    iconDirection: 'right'
  },
  {
    id: 'full-stack',
    title: 'Full Stack Engineer',
    subtitle: 'Books Embassy',
    description: 'Building full-stack applications using MERN stack. Setting up CI/CD pipelines, working with Docker, and managing cloud infrastructure. The platform supports a lot of users.',
    vehicle: 'tesla',
    year: '2021-2024',
    icon: '⚡',
    iconDirection: 'left'
  },
  {
    id: 'digital-strategist',
    title: 'Digital Strategist',
    subtitle: 'Global Knights Foundation',
    description: 'Serving as Digital Strategist, providing strategic technology consulting and guidance. Managing and developing the organization\'s website, ensuring optimal digital presence. Building digital platforms with MERN stack and Next.js to support elder care and community-building initiatives.',
    vehicle: 'plane',
    year: '2024 - Present',
    icon: '✈️',
    iconDirection: 'right'
  }
];

