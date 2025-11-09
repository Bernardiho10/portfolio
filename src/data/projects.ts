import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: 'mini-project',
    title: 'Mini Project',
    description: 'This is a mini project showcasing my technical skills.',
    longDescription: 'A mini project demonstrating various technical skills and capabilities. This project serves as a showcase of development expertise across different technologies and frameworks.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'JavaScript'],
    category: 'Portfolio',
    image: '/project1-miniproject.png',
    liveUrl: 'https://project1.bernardarikuoko.com.ng',
    featured: true
  },
  {
    id: 'unity-nodes-mnt-magic',
    title: 'Unity Nodes - MNT Magic',
    description: 'Turn Your Minutes into MNT Magic. Farm MNT rewards effortlessly with Unity Nodes. Turn every call into crypto gains while supporting decentralized telecom infrastructure.',
    longDescription: 'Unity Nodes allows users to farm MNT rewards effortlessly by turning every call into crypto gains. The platform supports decentralized telecom infrastructure, enabling users to earn cryptocurrency rewards while making calls. Built with modern web technologies and blockchain integration.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Blockchain', 'Web3', 'Node.js', 'MongoDB'],
    category: 'Blockchain / Crypto',
    image: '/project2-unitylicense.png',
    liveUrl: 'https://project2.bernardarikuoko.com.ng',
    featured: false
  },
  {
    id: 'dance-hub',
    title: 'Dance Hub',
    description: 'Move to the Rhythm of Your Dreams. Experience world-class dance instruction, book custom events, and join a vibrant community of dancers. Your journey starts here.',
    longDescription: 'Dance Hub is a platform for dance enthusiasts to experience world-class dance instruction, book custom events, and join a vibrant community of dancers. The platform offers booking systems, event management, and community features for dancers of all levels.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    category: 'Dance / Events',
    image: '/project3-Dancehub.png',
    liveUrl: 'https://project3.bernardarikuoko.com.ng',
    featured: false
  },
  {
    id: 'drflow',
    title: 'Drflow',
    description: 'Modern Solutions for Practice Management. Manage, streamline, and get more done with Drflow, the tool for every practitioner\'s workflow. This is a product page sample.',
    longDescription: 'Drflow is a modern practice management solution designed to help practitioners manage, streamline, and get more done. This product page showcases the features and benefits of the platform, including workflow management, appointment scheduling, and client management tools.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Practice Management',
    image: '/project4-drflowproductpagesample.png',
    liveUrl: 'https://project4.bernardarikuoko.com.ng',
    featured: false
  },
  {
    id: 'decentralized-lottery',
    title: 'Decentralized Lottery Platform',
    description: 'The Future of Lottery is Here. Experience the world\'s first fully decentralized lottery platform powered by blockchain technology. Transparent, fair, and impossible to manipulate.',
    longDescription: 'A revolutionary decentralized lottery platform that leverages blockchain technology to ensure complete transparency and fairness. Built as the world\'s first fully decentralized lottery system, it eliminates the possibility of manipulation through smart contracts and cryptographic verification. Users can participate in lottery draws with complete trust, knowing that every transaction and draw result is verifiable on the blockchain.',
    technologies: ['Blockchain', 'Web3', 'Solidity', 'React', 'Next.js', 'TypeScript', 'Ethereum', 'Smart Contracts', 'Tailwind CSS'],
    category: 'Blockchain / Crypto',
    image: '/projext5-crypto.png',
    liveUrl: 'https://project5.bernardarikuoko.com.ng',
    featured: false
  }
];
