import { motion } from "framer-motion"; // Import motion

export default function About() {
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
  
  // Portrait animation - slide in from bottom
  const portraitVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };
  
  // Text content animation - slide in from right
  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        type: "spring",
        damping: 15
      }
    }
  };
  
  // Card animation - fade in
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  return (
    // Wrap the section with motion.section and apply variants
    <motion.section
      id="about"
      className="py-16 md:py-20 lg:py-28 xl:py-32 min-h-[80vh] lg:min-h-[90vh] xl:min-h-screen flex items-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 xl:gap-32">
            {/* Portrait Section - slide in from bottom */}
            <motion.div 
              className="w-full lg:w-2/5 mb-8 lg:mb-0"
              variants={portraitVariants}
            >
              <div className="card relative mx-auto max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] lg:-mr-12">
                <div className="circle before:content-[''] before:absolute before:top-[30px] before:left-[2px] before:right-[2px] before:w-[350px] before:h-[350px] lg:before:w-[400px] lg:before:h-[400px] xl:before:w-[450px] xl:before:h-[450px] before:rounded-full before:bg-[#111111] before:border-8 before:border-[#8b5cf6] before:transition-all before:duration-500 before:shadow-[0_0_50px_#8b5cf6] before:[animation:pulse_4s_ease-in-out_infinite]">
                  <div className="relative w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden z-10 top-[30px]">
                    <img 
                      src="LINKEDINIMAGE.png" 
                      alt="Ross Muretov"
                      className="absolute w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Section - text slides in from right */}
            <div className="w-full lg:w-3/5">
              <motion.div 
                className="space-y-6 lg:space-y-8"
                variants={textVariants}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="text-white">Hello, I'm </span>
                  <span className="text-[#8b5cf6]">Ross Muretov</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
                  I am a highly motivated and adaptable Computer Programming & Analysis student currently in my 5th Semester at Seneca College. I combine a strong academic foundation in full-stack development, database management, cloud computing (AWS), and CI/CD practices with extensive international experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Card 1 - fade in */}
                  <motion.div 
                    className="bg-[#111111] p-6 lg:p-8 rounded-lg border border-[#222222]"
                    variants={cardVariants}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 15px 30px rgba(139, 92, 246, 0.15)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <i className='bx bx-bulb text-2xl lg:text-3xl text-[#8b5cf6] mr-3'></i>
                      <h3 className="text-xl lg:text-2xl font-semibold text-white">Key Skills</h3>
                    </div>
                    <ul className="space-y-2 lg:space-y-3 text-gray-400">
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                        <span>Strong problem-solving abilities</span>
                      </li>
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                        <span>Exceptional communication skills</span>
                      </li>
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                        <span>Cross-cultural collaboration expertise</span>
                      </li>
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#8b5cf6] mr-2 mt-1'></i>
                        <span>Quick learner with adaptability</span>
                      </li>
                    </ul>
                  </motion.div>

                  {/* Card 2 - fade in */}
                  <motion.div 
                    className="bg-[#111111] p-6 lg:p-8 rounded-lg border border-[#222222]"
                    variants={cardVariants}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 15px 30px rgba(139, 92, 246, 0.15)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <i className='bx bx-target-lock text-2xl lg:text-3xl text-[#8b5cf6] mr-3'></i>
                      <h3 className="text-xl lg:text-2xl font-semibold text-white">Career Goals</h3>
                    </div>
                    <p className="text-gray-400">
                      I am currently seeking a challenging Co-op opportunity within the tech industry where I can apply my technical knowledge and soft skills to contribute to meaningful projects while continuing to grow as a developer.
                    </p>
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mr-2 mb-2">Full-stack Development</span>
                      <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mr-2 mb-2">Cloud Computing</span>
                      <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mr-2 mb-2">Software Engineering</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}