import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Bernard Ariku Oko",
  initials: "BAO",
  url: "https://bernardarikuoko.com.ng",
  location: "Nigeria",
  locationLink: "https://www.google.com/maps/place/nigeria",
  description:
    "Frontend Developer & Full Stack Engineer. Building scalable solutions with MERN stack. Passionate about creating accessible technology for everyone.",
  summary:
    "Highly skilled frontend developer with 7+ years of experience building responsive web applications using JavaScript, React, and the MERN stack. Specializing in React.js and frontend development with intermediate backend skills. Experienced in CI/CD pipelines, Docker containerization, and cloud engineering.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "Express.js",
    "PHP",
    "Docker",
    "CI/CD",
    "Cloud Engineering",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "bernardarikuoko@gmail.com",
    tel: "+234",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Bernardiho10",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/bernardiho10/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Bernard_iho",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:bernardarikuoko@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Global Knights Foundation",
      href: "http://www.gkf.org.ng/",
      badges: [],
      location: "Abuja, Nigeria",
      title: "Digital Strategist",
      logoUrl: "/GK-Logo_251001_185958-1.png",
      start: "June 2024",
      end: "Present",
      description:
        "Serving as Digital Strategist, providing strategic technology consulting and guidance on all tech-related initiatives. Managing and developing the organization's website, ensuring optimal digital presence and functionality. Part of the UNIDOP 2025 Planning Team, working on digital platforms that support elder care and community-building initiatives.",
    },
    {
      company: "Books Embassy",
      badges: [],
      href: "https://www.booksembassy.com/",
      location: "FCT, Abuja, Nigeria",
      title: "Full Stack Engineer",
      logoUrl: "/booksembassy.png",
      start: "August 2021",
      end: "March 2024",
      description:
        "Led zero-downtime migration from legacy PHP to React.js platform. Mapped business logic, designed phased migration, rebuilt UI with feature parity. Refactored APIs, optimized PostgreSQL, implemented CI/CD. Reduced page load times 60%, cut cloud costs 25%, scaled for growth.",
    },
    {
      company: "BodymotionsPhysio",
      href: "https://bodymotionsphysio.com/",
      badges: [],
      location: "Victoria Island, Lagos, Nigeria",
      title: "Backend Engineer",
      logoUrl: "/bodymotionpyhsio.png",
      start: "September 2019",
      end: "June 2021",
      description:
        "Working on backend development using Node.js and MongoDB to build server-side solutions for a healthcare platform. Building backend systems for appointment scheduling, patient data management, and API integrations.",
    },
    {
      company: "Efiko Freelance Marketplace",
      badges: [],
      location: "FCT, Abuja, Nigeria",
      title: "Junior Frontend Engineer",
      logoUrl: "/efikofreelance.PNG",
      start: "February 2017",
      end: "July 2019",
      description:
        "Starting professional journey as a Junior Frontend Engineer, focusing on building responsive user interfaces. Working with senior developers to implement new features, fix bugs, and improve website performance.",
    },
  ],
  education: [
    {
      school: "University of Calabar",
      href: "https://www.unical.edu.ng",
      degree: "BSc in Electronic Computer Technology",
      start: "2001",
      end: "2005",
    },
  ],
  projects: [
    {
      title: "Zanda Health Clone",
      href: "/projects/zanda-clone",
      dates: "2023 - Present",
      active: true,
      description:
        "Enterprise SaaS platform for Nigerian healthcare practices with calendar management, telehealth, and AI transcription.",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Stripe",
        "OpenAI",
        "WebRTC",
      ],
      links: [
        {
          type: "Website",
          href: "/projects/zanda-clone",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
    },
    {
      title: "DeepSeek-OCR Trainer",
      href: "https://github.com/bernardiho10/deepseek-ocr",
      dates: "2023 - Present",
      active: true,
      description:
        "Custom OCR model training pipeline for document processing in healthcare and legal sectors.",
      technologies: [
        "Python",
        "PyTorch",
        "Hugging Face",
        "DeepSpeed",
        "OpenCV",
        "FastAPI",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/bernardiho10/deepseek-ocr",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
    },
    {
      title: "AI Emotion Analyzer",
      href: "https://github.com/bernardiho10/emotion-analyzer",
      dates: "October 2023",
      active: false,
      description:
        "Real-time emotion detection system for customer service and mental health applications. Won Best AI Innovation at Lagos Dev Hack 2023.",
      technologies: [
        "Python",
        "TensorFlow",
        "OpenCV",
        "Flask",
        "React",
        "WebSockets",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/bernardiho10/emotion-analyzer",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
    },
  ],
  hackathons: [
    {
      title: "Lagos Dev Hack 2023",
      dates: "October 2023",
      location: "Lagos, Nigeria",
      description:
        "Won first place for building an AI Emotion Analyzer for mental health applications. Real-time facial expression and sentiment analysis system using TensorFlow and OpenCV.",
      win: "Best AI Innovation",
      links: [],
    },
    {
      title: "EdTech Nigeria Hackathon",
      dates: "March 2021",
      location: "Abuja, Nigeria",
      description:
        "Built augmented reality tool for tech literacy education in rural Nigerian schools. Interactive 3D models teaching computer science concepts, optimized for low-bandwidth environments.",
      win: "Runner-up",
      links: [],
    },
    {
      title: "Nigeria Fintech Week Hackathon",
      dates: "November 2020",
      location: "Lagos, Nigeria",
      description:
        "Developed microfinance platform for rural Nigerian communities with offline-first architecture and USSD integration.",
      links: [],
    },
  ],
} as const;
