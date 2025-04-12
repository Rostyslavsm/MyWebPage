import { resumeData } from "@/data/resumeData";
import { motion } from "framer-motion";

export default function Projects() {
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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        damping: 15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="py-20 bg-[#0a0a0a]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          variants={titleVariants}
        >
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {resumeData.projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="bg-[#111111] rounded-lg overflow-hidden border border-[#222222] transition-all duration-300 hover:border-[#8b5cf6]/50"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="h-48 bg-[#0a0a0a] flex items-center justify-center"
                whileHover={{
                  backgroundColor: "#0d0d0d"
                }}
              >
                <motion.i 
                  className={`bx ${project.icon} text-6xl text-[#8b5cf6]/30`}
                  whileHover={{ 
                    scale: 1.2, 
                    color: "rgba(139, 92, 246, 0.5)",
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                ></motion.i>
              </motion.div>
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-bold text-white mb-2"
                  variants={itemVariants}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-400 mb-4"
                  variants={itemVariants}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="mb-4"
                  variants={itemVariants}
                >
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 ml-5 list-disc text-gray-400">
                    {project.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                        viewport={{ once: false }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.h4 
                  className="font-semibold text-white mb-2"
                  variants={itemVariants}
                >
                  Technologies:
                </motion.h4>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  variants={itemVariants}
                >
                  {project.technologies.map((tech, idx) => (
                    <motion.span 
                      key={idx} 
                      className="px-2 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-xs"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      viewport={{ once: false }}
                      whileHover={{ 
                        backgroundColor: "rgba(139, 92, 246, 0.3)",
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="flex space-x-3"
                  variants={itemVariants}
                >
                  {project.liveDemo && (
                    <motion.a 
                      href={project.liveDemo} 
                      className="text-[#8b5cf6] hover:text-[#9f75ff] flex items-center transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className='bx bx-link-external mr-1'></i> Live Demo
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a 
                      href={project.github} 
                      className="text-[#8b5cf6] hover:text-[#9f75ff] flex items-center transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className='bx bxl-github mr-1'></i> GitHub
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
