import { resumeData } from "@/data/resumeData";
import { motion } from "framer-motion";
import { useEffect, ReactNode, useMemo } from "react";
import styled from "styled-components";

// Define TypeScript interface for language data
interface Language {
  name: string;
  level: string;
  description?: string; // Optional description property
}

const LanguageCard = styled(motion.div)`
  position: relative;
  height: 100%;
`;

const LanguageCardContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: visible;
  &.back {
    opacity: 0;
    transition: opacity 0.3s;
    ${LanguageCard}:hover & {
      opacity: 1;
    }
  }
`;

export default function Languages() {
  // Add CSS for 3D effect on component mount
  useEffect(() => {
    // Append CSS for card styling if it doesn't exist
    if (!document.getElementById('3d-card-styles')) {
      const style = document.createElement('style');
      style.id = '3d-card-styles';
      style.innerHTML = `
        .perspective-500 {
          perspective: 1000px;
        }
        .card-content-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        .card-content-3d:hover {
          transform: rotateY(30deg);
          box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add flag-icons CSS if not already included
    if (!document.querySelector('link[href*="flag-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/css/flag-icons.min.css';
      document.head.appendChild(link);
    }
    
    return () => {
      // Clean up only the 3D styles on unmount, leave flag-icons for other components
      const style = document.getElementById('3d-card-styles');
      if (style) {
        style.remove();
      }
    };
  }, []);

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
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };
  
  const cardContainerVariants = {
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };

  // Flags mapping for language cards
  const flagIcons: { [key: string]: string } = {
    "English": "gb",
    "Ukrainian": "ua",
    "Russian": "ru",
    "Polish": "pl",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Italian": "it",
    "Chinese": "cn",
    "Japanese": "jp",
    // Add other languages as needed
  };

  // Helper function to get a gradient based on proficiency level
  const getLevelGradient = (level: string) => {
    switch(level) {
      case "Fluent":
        return "bg-gradient-to-r from-[#8b5cf6] to-[#9f75ff]";
      case "Professional":
        return "bg-gradient-to-r from-[#6366f1] to-[#818cf8]";
      case "Intermediate":
        return "bg-gradient-to-r from-[#4f46e5] to-[#6366f1]";
      case "Basic":
        return "bg-gradient-to-r from-[#3730a3] to-[#4f46e5]";
      default:
        return "bg-gradient-to-r from-[#8b5cf6] to-[#9f75ff]";
    }
  };

  const languages = useMemo(() => {
    // Sort languages to ensure English is first
    return [...resumeData.languages]
      .sort((a, b) => {
        if (a.name.toLowerCase() === 'english') return -1;
        if (b.name.toLowerCase() === 'english') return 1;
        return 0;
      })
      .slice(0, 4); // Limit to 4 languages
  }, [resumeData.languages]);

  return (
    <motion.section 
      id="languages"
      className="py-16 md:py-24 lg:py-32 bg-[#0a0a0a]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">Languages</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={cardContainerVariants}
        >
          {languages.map((language, index) => {
            // Type assertion to match our interface
            const typedLanguage = language as Language;
            
            return (
              <motion.div 
                key={index} 
                className="relative h-[220px] perspective-500"
                variants={cardVariants}
              >
                <div className="bg-[#111111] border border-[#222222] p-6 rounded-xl shadow-xl text-center absolute inset-0 w-full h-full card-content-3d">
                  <div className="relative flex flex-col items-center justify-center h-full w-full">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-5 border-2 border-[#222222] shadow-lg overflow-hidden"
                      whileHover={{ 
                        scale: 1.05, 
                        borderColor: "#8b5cf6",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {flagIcons[typedLanguage.name] ? (
                        <span className={`fi fi-${flagIcons[typedLanguage.name]} text-5xl`} style={{ boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}></span>
                      ) : (
                        <i className='bx bx-globe text-4xl text-[#8b5cf6]'></i>
                      )}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">{typedLanguage.name}</h3>
                    <span 
                      className={`inline-block px-5 py-2 ${getLevelGradient(typedLanguage.level)} text-white rounded-full font-medium shadow-lg`}
                    >
                      {typedLanguage.level}
                    </span>
                    <div className="pt-3 w-full mt-3">
                      <div className={`h-2 w-full bg-[#222222] rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full ${getLevelGradient(typedLanguage.level)}`}
                          style={{ 
                            width: typedLanguage.level === "Fluent" ? "100%" : 
                                  typedLanguage.level === "Professional" ? "85%" : 
                                  typedLanguage.level === "Intermediate" ? "65%" : 
                                  typedLanguage.level === "Basic" ? "40%" : "25%" 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
