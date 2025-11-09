import { Experience, Certification } from '@/types/portfolio';

// Professional Work Experience Only
export const workExperience: Experience[] = [
  {
    id: 'global-knights-foundation',
    title: 'Digital Strategist',
    organization: 'Global Knights Foundation',
    location: 'Abuja, Nigeria',
    period: 'June 2024 - Present',
    description: 'Serving as Digital Strategist, providing strategic technology consulting and guidance on all tech-related initiatives. Managing and developing the organization\'s website, ensuring optimal digital presence and functionality. Part of the UNIDOP 2025 Planning Team, working on digital platforms that support elder care and community-building initiatives.',
    type: 'work',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'Next.js', 'TypeScript', 'Web Development', 'Digital Strategy'],
    website: 'http://www.gkf.org.ng/',
    logoUrl: '/GK-Logo_251001_185958-1.png',
    companyDescription: 'Global Knights Foundation works to improve the lives of older persons through advocacy, support, and community-building. The organization focuses on health and wellbeing, transportation support, nutrition, and policy advocacy to help older persons live with dignity and access essential resources.',
    responsibilities: [
      'Providing strategic technology consulting on all tech-related decisions and initiatives',
      'Managing and developing the organization\'s website using modern web technologies',
      'Building and maintaining full-stack digital platforms using MERN stack and Next.js',
      'Working on system architecture for healthcare, transportation, nutrition, and social interaction platforms',
      'Developing responsive frontend interfaces with React.js and TypeScript',
      'Creating RESTful APIs with Node.js and Express.js for data integration',
      'Building and maintaining PostgreSQL databases for user data and records',
      'Working with UNIDOP 2025 Planning Team to understand technical requirements',
      'Evaluating and recommending technology solutions that align with organizational goals',
      'Setting up CI/CD pipelines and DevOps practices for deployment',
      'Researching and evaluating technologies that might help improve digital initiatives',
      'Working with stakeholders to understand business needs and translate them into technical solutions',
      'Ensuring compliance with data privacy regulations and security practices',
      'Optimizing website and application performance for optimal user experience',
      'Participating in strategic discussions and providing technical guidance on technology choices'
    ],
    keyAchievements: [   
      'Successfully managed and developed the organization\'s website, improving digital presence',
      'Provided strategic technology guidance that helped shape digital initiatives',
      'Improved website load time and performance through optimization',
      'Set up development workflows and practices for the team',
      'Delivered features for UNIDOP 2025 planning initiatives on schedule',
      'Improved platform accessibility for users with varying technical skills',
      'Implemented error handling and monitoring, maintaining good uptime',
      'Worked with cross-functional teams to deliver digital solutions for elder care',
      'Established best practices for website management and development'
    ]
  },
  {
    id: 'books-embassy',
    title: 'Full Stack Engineer',
    organization: 'Books Embassy',
    location: 'FCT, Abuja, Nigeria',
    period: 'August 2021 - March 2024',
    description: 'Led zero-downtime migration from legacy PHP to React.js platform.',
    type: 'work',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'PHP', 'Docker', 'CI/CD', 'Cloud Infrastructure', 'Git'],
    website: 'https://www.booksembassy.com/',
    logoUrl: '/booksembassy.png',
    companyDescription: 'Books Embassy is an education services company that helps students fulfill their dreams of studying abroad. They provide application and admissions services, personalized guidance, recruitment services for institutions, and scholarship programs. The company also offers Replic8, a skills training program for digital marketing, web design, and business management.',
    responsibilities: [
      'Led migration from legacy PHP to React.js frontend',
      'Mapped business logic and user workflows in PHP',
      'Designed phased migration with incremental releases',
      'Rebuilt UI in React.js with feature parity and responsive design',
      'Refactored APIs and migrated auth/session logic',
      'Built Node.js/Express APIs; optimized PostgreSQL',
      'Implemented GitHub Actions CI/CD and Docker',
      'Managed cloud infra; cut costs 25%',
      'Integrated payment/storage/analytics APIs',
      'Mentored 2 juniors via code reviews',
      'Collaborated with PMs/designers; scaled for concurrency'
    ],
    keyAchievements: [
      'Migrated platform with zero downtime',
      'Cut page load times 60% | Reduced cloud costs 25%',
      'Scaled for 5% user growth | Cut doc upload time 40%',
      'Shipped 10+ features | Boosted engagement via modern UX',
      'Automated deployments | Mentored 3 juniors',
      'Preserved 100% functionality; introduced React best practices'
    ]
  },
  {
    id: 'bodymotionsphysio',
    title: 'Backend Engineer',
    organization: 'BodymotionsPhysio',
    location: 'Victoria Island, Lagos, Nigeria',
    period: 'September 2019 - June 2021',
    description: 'Working on backend development using Node.js and MongoDB to build server-side solutions for a healthcare platform. Building backend systems for appointment scheduling, patient data management, and API integrations. Learning about database design, RESTful APIs, and healthcare compliance standards.',
    type: 'work',
    technologies: ['JavaScript', 'CSS', 'HTML5', 'Git', 'Node.js'],
    website: 'https://bodymotionsphysio.com/',
    logoUrl: '/bodymotionpyhsio.png',
    companyDescription: 'BodymotionsPhysio is a physiotherapy clinic in Nigeria providing quality consultations and treatment. The clinic offers personalized physiotherapy services including acupuncture, chronic conditions treatment, and musculoskeletal and orthopedic care. They use technology, scientific evidence, and clinical experience to help patients improve their health and mobility.',
    responsibilities: [
      'Developing backend systems for appointment scheduling, patient data management, and API integrations',
      'Building and maintaining MongoDB database schemas for patient records and appointments',
      'Creating automated appointment scheduling system handling 500+ daily appointments',
      'Building secure, HIPAA-compliant systems for handling sensitive patient information',
      'Refactoring legacy backend code to improve performance and maintainability'
    ],
    keyAchievements: [
      'Reduced manual scheduling time by 30% through automated system',
      'Improved page load speed by 25%',
      'Increased site traffic through backend performance improvements',
      'Migrated legacy systems to modern MERN stack architecture',
      'Maintained HIPAA compliance with no security incidents',
      'Handled 500+ daily appointments without downtime',
      'Helped junior developers learn backend best practices'
    ]
  },
  {
    id: 'efiko-freelance',
    title: 'Junior Frontend Engineer',
    organization: 'Efiko Freelance Marketplace',
    location: 'FCT, Abuja, Nigeria',
    period: 'February 2017 - July 2019',
    description: 'Starting my professional journey as a Junior Frontend Engineer, focusing on building responsive user interfaces. Working with senior developers to implement new features, fix bugs, and improve website performance. Learning modern JavaScript, React.js, and frontend development practices.',
    type: 'work',
    technologies: ['JavaScript', 'PHP', 'HTML5', 'CSS3', 'Frontend Optimization', 'SEO', 'Git'],
    logoUrl: '/efikofreelance.PNG',
    companyDescription: 'Efiko Freelance Marketplace is a platform connecting freelancers with clients, providing opportunities for developers and professionals to work on various projects. The platform facilitates collaboration and helps freelancers build their portfolios while serving client needs.',
    responsibilities: [
      'Building and maintaining responsive user interfaces using HTML, CSS, and JavaScript',
      'Creating React components for user authentication, dashboard, and marketplace features',
      'Working with senior developers to build new features and improve existing functionality',
      'Testing across different browsers and fixing compatibility issues',
      'Optimizing website performance through code splitting and image optimization',
      'Fixing bugs and resolving frontend issues',
      'Improving website accessibility by adding ARIA labels and semantic HTML',
      'Using Git for version control and collaboration'
    ],
    keyAchievements: [
      'Improved user activity through UI improvements and new features',
      'Improved page load speed by 45%',
      'Increased user registrations through better registration flow',
      'Delivered 10+ feature enhancements',
      'Learned a lot about frontend development and best practices'
    ]
  }
];

// Achievements, Awards, and Recognition (separate from work experience)
export const achievements: Experience[] = [
  {
    id: 'lagos-dev-hack-2023',
    title: 'Best AI Innovation Award',
    organization: 'Lagos Dev Hack 2023',
    location: 'Lagos, Nigeria',
    period: 'October 2023',
    description: 'Won first place for building an AI Emotion Analyzer for mental health applications. Real-time facial expression and sentiment analysis system using TensorFlow and OpenCV, designed to support Nigerian mental health professionals.',
    type: 'hackathon',
    award: '🏆 Best AI Innovation',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React']
  },
  {
    id: 'healthcare-schema-opensource',
    title: 'Core Contributor',
    organization: 'Nigerian Healthcare Schema Project',
    location: 'Remote',
    period: '2022 - Present',
    description: 'Contributing to open-source database schemas and APIs for Nigerian healthcare systems. Developed NDPR-compliant data models, HIPAA-aligned security patterns, and integration standards for EMR systems across Nigerian hospitals.',
    type: 'opensource',
    technologies: ['PostgreSQL', 'TypeScript', 'GraphQL']
  },
  {
    id: 'calabar-tech-summit',
    title: 'Speaker & Workshop Leader',
    organization: 'Calabar Tech Summit 2022',
    location: 'Calabar, Nigeria',
    period: 'June 2022',
    description: 'Led workshop on "Building Scalable SaaS for African Markets" covering multi-tenancy, local payment integration, and infrastructure optimization for Nigerian developers. Mentored 50+ aspiring developers.',
    type: 'hackathon',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe']
  },
  {
    id: 'ar-education-tool',
    title: 'AR Education Platform',
    organization: 'EdTech Nigeria Hackathon',
    location: 'Abuja, Nigeria',
    period: 'March 2021',
    description: 'Built augmented reality tool for tech literacy education in rural Nigerian schools. Interactive 3D models teaching computer science concepts, optimized for low-bandwidth environments. Reached 500+ students in pilot program.',
    type: 'hackathon',
    award: '🥈 Runner-up',
    technologies: ['React Native', 'TypeScript', 'Expo', 'Firebase']
  },
  {
    id: 'sustainable-fintech',
    title: 'Sustainable Fintech Solutions',
    organization: 'Nigeria Fintech Week Hackathon',
    location: 'Lagos, Nigeria',
    period: 'November 2020',
    description: 'Developed microfinance platform for rural Nigerian communities with offline-first architecture and USSD integration. Enabled financial inclusion for underbanked populations with solar-powered kiosk deployment.',
    type: 'hackathon',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Docker', 'CI/CD', 'Cloud Engineering']
  }
];

// Legacy export for backwards compatibility (work experience only)
export const experiences = workExperience;

export const certifications: Certification[] = [
  {
    id: 'azure-ai-fundamentals',
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
    badgeUrl: '/certifcate_microsoft_azure.a777095a8123aa4f577a.PNG',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/BernardArikuOko-3774/5A59C881909C52E5'
  },
  {
    id: 'azure-ai-engineer',
    name: 'Microsoft Certified: Azure AI Engineer Associate',
    issuer: 'Microsoft',
    year: '2024',
    badgeUrl: '/Microsoft Azure_AI_Engineer_Associate_Certificate.1829c8530cb61a8c7654.PNG',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/BernardArikuOko-3774'
  }
];


