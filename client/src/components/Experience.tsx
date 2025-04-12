import { resumeData } from "@/data/resumeData";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heartAnimation from "@/assets/Heart.json";
import { useMemo } from "react";

export default function Experience() {
  // Create a slowed down version of the animation
  const slowHeartAnimation = useMemo(() => {
    // Create a deep copy of the animation
    const animationCopy = JSON.parse(JSON.stringify(heartAnimation));
    
    // Divide the frame rate by 4 to slow down the animation by 4x
    if (animationCopy.fr) {
      animationCopy.fr = animationCopy.fr / 4;
    }
    
    return animationCopy;
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
        staggerChildren: 0.2
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
  
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.3
      }
    }
  };
  
  const cardLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };
  
  const cardRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };
  
  const dotVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.section 
      id="experience" 
      className="py-20"
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
          <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <motion.div 
            className="relative"
            variants={timelineVariants}
          >
            {/* Vertical Line */}
            <motion.div 
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#222222]"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            ></motion.div>
            
            {resumeData.experience.map((job, index) => (
              <motion.div 
                key={index} 
                className="relative z-10 mb-12"
                variants={index % 2 === 0 ? cardRightVariants : cardLeftVariants}
                viewport={{ once: false, amount: 0.3 }}
              >
                {index === 0 && (
                  <motion.div 
                    className="relative md:absolute md:w-5/12 md:left-0 md:top-0 transform hidden md:flex justify-end items-start z-20"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <div className="w-80 h-80 md:w-96 md:h-96 relative opacity-45">
                      <Lottie 
                        animationData={slowHeartAnimation}
                        className="w-full h-full"
                        loop={true}
                      />
                    </div>
                  </motion.div>
                )}
                
                <div className="hidden md:flex items-center justify-center">
                  <motion.div 
                    className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#222222] bg-[#111111] absolute left-1/2 transform -translate-x-1/2"
                    variants={dotVariants}
                  >
                    <motion.div 
                      className="w-3 h-3 bg-[#8b5cf6] rounded-full"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                  </motion.div>
                </div>
                
                <div className="relative md:flex items-center justify-between">
                  {index % 2 === 0 ? (
                    <>
                      <div className="hidden md:block w-5/12"></div>
                      <motion.div 
                        className="md:w-5/12 bg-[#111111] p-6 rounded-lg border border-[#222222] ml-0 md:ml-auto"
                        whileHover={{ 
                          boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)",
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mt-2 sm:mt-0">{job.period}</span>
                        </div>
                        <h4 className="text-lg text-gray-400 mb-3">{job.company} | {job.location}</h4>
                        <ul className="space-y-2 ml-5 list-disc text-gray-400">
                          {job.responsibilities.map((resp, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.4 }}
                              viewport={{ once: false }}
                            >
                              {resp}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        className="md:w-5/12 bg-[#111111] p-6 rounded-lg border border-[#222222] mr-0 md:mr-auto"
                        whileHover={{ 
                          boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)",
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mt-2 sm:mt-0">{job.period}</span>
                        </div>
                        <h4 className="text-lg text-gray-400 mb-3">{job.company} | {job.location}</h4>
                        <ul className="space-y-2 ml-5 list-disc text-gray-400">
                          {job.responsibilities.map((resp, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.4 }}
                              viewport={{ once: false }}
                            >
                              {resp}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      <div className="hidden md:block w-5/12"></div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
