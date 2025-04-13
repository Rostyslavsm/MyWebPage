import { useState, useEffect, useRef } from "react";
import { resumeData } from "@/data/resumeData";
import { motion } from "framer-motion";
import MatrixRain from "./MatrixRain";
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
// Removed isVisible prop and its usage
const TechCard = ({ tech, category, index }: { tech: string, category: string, index: number }) => {
  const bgColor = getTechColor(category, index);
  const iconClass = techIcons[tech] || "bx-code"; // Default to code icon if not found

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#8b5cf6]/50 transition-all w-[140px] md:w-[160px] lg:w-[180px]"
      initial={{ opacity: 0, y: 20 }}
      // Changed animation to always animate to the visible state
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.15)", transition: { duration: 0.2 } }}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center mb-3"
        style={{ 
          backgroundColor: `${bgColor}30`,
          boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)"
        }}
      >
        <i
          className={`bx ${iconClass} text-3xl md:text-4xl`}
          style={{
            color: bgColor,
            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.2))",
            transform: "scale(1.2)"
          }}
        ></i>
      </div>
      <span className="text-white text-sm md:text-base font-medium text-center">{tech}</span>
    </motion.div>
  );
};

export default function Skills() {
  // State for active category
  const [activeCategory, setActiveCategory] = useState("programmingLanguages");
  // State to track if the Skills section is in view
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Setup intersection observer to detect when Skills section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
    <section 
      id="skills" 
      className="py-16 md:py-24 lg:py-32 xl:py-40 relative min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] flex flex-col justify-center"
      ref={sectionRef}
    >
      {/* Glassmorphic Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-10 md:h-10 flex items-center justify-center backdrop-blur-sm bg-black/30 border-b border-white/10 z-20"></div>
      {/* Always render Vortex but control visibility with prop */}
      {/* Matrix Rain Background */}
      {isInView && <MatrixRain isVisible={isInView} />}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        {/* Glassmorphic Two-Row Menu */}
        <div className="relative mb-12 lg:mb-16 transition-all duration-1000 opacity-100 translate-y-0">
          <div className="backdrop-blur-md bg-[#111111]/40 border border-[#ffffff10] mx-auto max-w-5xl xl:max-w-6xl overflow-hidden rounded-xl">
            {/* First row - first 3 buttons */}
            <div className="grid grid-cols-3 w-full">
              {categories.slice(0, 3).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-4 md:py-5 lg:py-6 flex flex-col items-center justify-center transition-all duration-300 border-r border-[#ffffff10] last:border-r-0 ${
                    activeCategory === category.id
                      ? "bg-[#8b5cf6]/20 text-white"
                      : "bg-[#ffffff05] text-gray-300 hover:bg-[#ffffff10]"
                  }`}
                >
                  <i className={`bx ${category.icon} text-xl md:text-2xl mb-1 md:mb-2`}></i>
                  <span className="text-sm md:text-base whitespace-nowrap">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Second row - last 3 buttons */}
            <div className="grid grid-cols-3 w-full border-t border-[#ffffff10]">
              {categories.slice(3).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-4 md:py-5 lg:py-6 flex flex-col items-center justify-center transition-all duration-300 border-r border-[#ffffff10] last:border-r-0 ${
                    activeCategory === category.id
                      ? "bg-[#8b5cf6]/20 text-white"
                      : "bg-[#ffffff05] text-gray-300 hover:bg-[#ffffff10]"
                  }`}
                >
                  <i className={`bx ${category.icon} text-xl md:text-2xl mb-1 md:mb-2`}></i>
                  <span className="text-sm md:text-base whitespace-nowrap">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Cards Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
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
      {/* Glassmorphic Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-10 flex items-center justify-center backdrop-blur-sm bg-black/30 border-b border-white/10 z-20"></div>
    </section>
  );
}