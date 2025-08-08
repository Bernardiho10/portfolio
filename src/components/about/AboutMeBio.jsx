import { useContext } from "react";
import AboutMeContext from "../../context/AboutMeContext";
import profileImage from "../../images/ben.png";
import { motion } from "framer-motion";

// Sample star component for skill level
const SkillLevel = ({ level }) => {
  const stars = Array(5).fill(0).map((_, i) => (
    <svg
      key={i}
      className={`w-4 h-4 ${i < level ? 'text-yellow-200' : 'text-gray-200'}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
  ));
  return <div className="flex items-center" style={{ width:"20%" }}>{stars}</div>;
};

const skills = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML", level: 5 },
      { name: "CSS", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "React", level: 3 },
      { name: "Bootstrap", level: 5 },
      { name: "Material UI", level: 5 },
      { name: "Tailwind", level: 5 },
    ]
  },
  {
    category: "Software Development",
    skills: [
      { name: "Next Js", level: 3 },
      { name: "Node JS", level: 3 },
      { name: "Java", level: 2 },
      { name: "Git", level: 3 },
      { name: "My SQL", level: 3 },
      { name: "Postgresql", level: 2 },
      { name: "Docker", level: 3 },
      { name: "Restful Api's", level: 3 },
      // { name: "Python", level: 3 },
      { name: "React Native", level: 2 },
      { name: "Expo", level: 2 },
      { name: "Jenkins", level: 2 },
    ]
  }
];

const AboutMeBio = () => {
  const { aboutMe, certificatesData } = useContext(AboutMeContext);

  return (
    <>
      <div className="block sm:flex sm:gap-10 mt-10 sm:mt-10">
        
        <div className="order-2 sm:order-1 w-full sm:w-2/3 text-center sm:mt-0 sm:self-start">
        <motion.div
          initial={{ opacity: 0, y: -180 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        >
          <img src={profileImage} className="rounded-lg mx-auto" alt="Profile" />
        </motion.div>
      </div>

        <div className="font-general-regular w-full sm:w-3/4" style={{width: '100%'}}>
          {aboutMe.map((bio) => (
            <p
              className="mb-4 text-ternary-dark dark:text-ternary-light text-lg"
              key={bio.id}
            >
              {bio.bio}
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
        {skills.map((section) => (
          <div key={section.category} className="p-4 border rounded-lg">
            <h2 className="font-general-medium text-1xl sm:text-2xl mb-5 text-center text-primary-dark dark:text-primary-light">{section.category}</h2>
            <ul>
              {section.skills.map((skill) => (
                <li key={skill.name} className="mb-2 flex justify-between">
                  <span className="font-general text-1xl sm:text-2xl mb-1 text-center text-primary-dark dark:text-primary-light">{skill.name}</span>
                  <SkillLevel level={skill.level} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="font-general-regular w-full sm:w-3/4 text-left mt-10" style={{width: '100%'}}>
        <h1 className="font-general-medium text-2xl sm:text-3xl  text-center text-primary-dark dark:text-primary-light mb-10 mt-10">CERTIFICATIONS</h1>
        {certificatesData.map((cert) => (
          <div key={cert.id} className="mb-10">
            <p className="text-ternary-dark dark:text-ternary-light text-lg font-bold">
              {cert.title}
            </p>
            <img className="rounded-lg" src={cert.image} alt={cert.title} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutMeBio;
