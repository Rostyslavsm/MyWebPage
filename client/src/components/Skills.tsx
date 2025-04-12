import { useState, useEffect } from "react";
import { resumeData } from "@/data/resumeData";
import { motion } from "framer-motion";
// Removed: import { useInView } from "react-intersection-observer";

// Tech icons mapping
const techIcons: { [key: string]: string } = {
  // Programming Languages
  "HTML5": "bxl-html5",
  "CSS3": "bxl-css3",
  "JavaScript": "bxl-javascript",
  "TypeScript": "bxl-typescript",
  "Python": "bxl-python",
  "Java": "bxl-java",
  "C#": "bx-code-curly",
  "C++": "bx-code-alt",
  "C": "bx-code",
  "Lua": "bx-code-block",
  "Node.js": "bxl-nodejs",

  // Databases
  "MongoDB": "bxl-mongodb",
  "Oracle SQL": "bx-data",
  "MySQL": "bxs-data",
  "SQL Server": "bx-server",
  "DynamoDB": "bxs-cloud",

  // Cloud Technologies
  "AWS": "bxl-amazon",
  "AWS (ECS, ECR, S3)": "bxl-amazon",
  "AWS (DynamoDB, Cognito)": "bxl-amazon",
  "AWS (EC2 Basics)": "bxl-amazon",
  "Docker": "bxl-docker",
  "Docker Compose": "bxs-dock-right",

  // Development Tools
  "Git": "bxl-git",
  "GitHub": "bxl-github",
  "GitHub Actions": "bx-broadcast",
  "GitHub Actions (CI/CD)": "bx-broadcast",
  "Visual Studio Code": "bxl-visual-studio",
  "IntelliJ IDEA": "bx-code-block",
  "Eclipse": "bx-sun",
  "Hurl": "bx-link",
  "Hurl (API Testing)": "bx-link",

  // Operating Systems
  "Windows": "bxl-windows",
  "Linux": "bxl-tux",
  "Linux/Unix": "bxl-tux",

  // Methodologies & Concepts
  "Object-Oriented Programming": "bx-extension",
  "Data Structures & Algorithms": "bx-list-check",
  "MVC Architecture": "bx-grid",
  "RESTful APIs": "bx-server",
  "Agile/Scrum": "bx-shape-circle",
  "Agile/Scrum Principles": "bx-shape-circle",
  "Microservices Architecture": "bx-network-chart",
  "CI/CD": "bx-git-branch",
  "Test-Driven Development": "bx-test-tube",
};

// Get background color based on tech category
const getTechColor = (category: string, index: number): string => {
  const colors = {
    "programmingLanguages": ["#e34c26", "#264de4", "#f0db4f", "#3178c6", "#306998", "#007396", "#9866d0", "#00599c", "#5e97d0", "#41cd52"],
    "databases": ["#13aa52", "#f80000", "#4479a1", "#ffda44", "#FF9900"],
    "cloudTechnologies": ["#FF9900", "#0db7ed", "#384d54"],
    "developmentTools": ["#F05032", "#181717", "#2088FF", "#007ACC", "#000000", "#2C2255", "#FF5722"],
    "operatingSystems": ["#0078D6", "#FCC624"],
    "methodologies": ["#007396", "#777BB4", "#61DAFB", "#000000", "#5DC9E2", "#FF6F00", "#4CAF50", "#F44336"],
  };

  // Default to a dark purple if category not found
  const categoryColors = colors[category as keyof typeof colors] || ["#8b5cf6"];

  // Loop through available colors based on index
  return categoryColors[index % categoryColors.length];
};

// Component for individual tech card
const TechCard = ({ tech, category, index }: { tech: string, category: string, index: number }) => {
  const bgColor = getTechColor(category, index);
  const iconClass = techIcons[tech] || "bx-code"; // Default to code icon if not found

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#8b5cf6]/50 transition-all w-[140px]"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.15)", transition: { duration: 0.2 } }}
    >
      <div
        className="w-16 h-16 rounded-lg flex items-center justify-center mb-3"
        style={{ backgroundColor: `${bgColor}30` }} // 30% opacity version of the color
      >
        <i
          className={`bx ${iconClass} text-3xl`}
          style={{
            color: bgColor,
            filter: iconClass === 'bxl-github' ||
                    iconClass === 'bx-broadcast' ||
                    iconClass === 'bx-sun' ||
                    iconClass === 'bx-link' ? 'drop-shadow(0 0 2px white)' : 'none'
          }}
        ></i>
      </div>
      <span className="text-white text-sm font-medium text-center">{tech}</span>
    </motion.div>
  );
};

export default function Skills() {
  // State for active category
  const [activeCategory, setActiveCategory] = useState("programmingLanguages");

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const menuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        type: "spring",
        damping: 15
      }
    }
  };

  // Categories data with icons and labels
  const categories = [
    { id: "programmingLanguages", label: "Programming Languages", icon: "bx-code-alt" },
    { id: "databases", label: "Databases", icon: "bx-data" },
    { id: "cloudTechnologies", label: "Cloud Technologies", icon: "bx-cloud" },
    { id: "developmentTools", label: "Development Tools", icon: "bx-wrench" },
    { id: "operatingSystems", label: "Operating Systems", icon: "bx-desktop" },
    { id: "methodologies", label: "Methodologies & Concepts", icon: "bx-brain" },
  ];

  return (
    <motion.section 
      id="skills" 
      className="py-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Glassmorphic Two-Row Menu */}
        <motion.div 
          className="relative mb-12"
          variants={menuVariants}
        >
          <div className="backdrop-blur-md bg-[#111111]/40 border border-[#ffffff10] mx-auto max-w-5xl overflow-hidden">
            {/* First row - first 3 buttons */}
            <div className="grid grid-cols-3 w-full">
              {categories.slice(0, 3).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-4 flex flex-col items-center justify-center transition-all duration-300 border-r border-[#ffffff10] last:border-r-0 ${
                    activeCategory === category.id
                      ? "bg-[#8b5cf6]/20 text-white"
                      : "bg-[#ffffff05] text-gray-300 hover:bg-[#ffffff10]"
                  }`}
                >
                  <i className={`bx ${category.icon} text-xl mb-1`}></i>
                  <span className="text-sm whitespace-nowrap">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Second row - last 3 buttons */}
            <div className="grid grid-cols-3 w-full border-t border-[#ffffff10]">
              {categories.slice(3).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-4 flex flex-col items-center justify-center transition-all duration-300 border-r border-[#ffffff10] last:border-r-0 ${
                    activeCategory === category.id
                      ? "bg-[#8b5cf6]/20 text-white"
                      : "bg-[#ffffff05] text-gray-300 hover:bg-[#ffffff10]"
                  }`}
                >
                  <i className={`bx ${category.icon} text-xl mb-1`}></i>
                  <span className="text-sm whitespace-nowrap">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Cards Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { 
                staggerChildren: 0.05,
                delayChildren: 0.2
              }
            }
          }}
        >
          {(resumeData.skills[activeCategory as keyof typeof resumeData.skills] as string[]).map((tech, index) => (
            <TechCard
              key={tech}
              tech={tech}
              category={activeCategory}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}