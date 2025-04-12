import { motion } from "framer-motion"; // Import motion
import { useEffect, useState } from "react";

export default function About() {
  // Add state for the pulsing neon color
  const [neonColor, setNeonColor] = useState("#8b5cf6");

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

  // Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Cards animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Create keyframes for the pulsing neon glow
  useEffect(() => {
    const keyframes = `
      @keyframes profilePulse {
        0% {
          box-shadow: 0 0 15px 2px ${neonColor}, 0 0 30px 5px ${neonColor}40;
          transform: scale(0.97);
        }
        50% {
          box-shadow: 0 0 25px 5px ${neonColor}, 0 0 70px 10px ${neonColor}70;
          transform: scale(1);
        }
        100% {
          box-shadow: 0 0 15px 2px ${neonColor}, 0 0 30px 5px ${neonColor}40;
          transform: scale(0.97);
        }
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = keyframes;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [neonColor]);

  return (
    // Wrap the section with motion.section and apply variants
    <motion.section
      id="about"
      className="py-20 bg-[#0a0a0a]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% is visible
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Portrait Section */}
            <motion.div
              className="w-full lg:w-1/3"
              variants={imageVariants}
            >
              <div className="card relative mx-auto max-w-[350px]">
                <div className="relative">
                  {/* Outer neon glow ring */}
                  <div 
                    className="absolute z-0 rounded-full"
                    style={{
                      top: '15px',
                      left: '15px', 
                      width: '320px',
                      height: '320px',
                      border: `8px solid ${neonColor}`,
                      animation: 'profilePulse 4s infinite ease-in-out',
                      filter: `blur(8px)`,
                      opacity: 0.85,
                    }}
                  ></div>
                  
                  {/* Inner gradient circle with white border */}
                  <div 
                    className="relative z-10 mx-auto rounded-full overflow-hidden"
                    style={{
                      width: '330px',
                      height: '330px',
                      background: `radial-gradient(circle, #2a1b3d 0%, #171321 60%, #0d0a12 100%)`,
                      border: `3px solid #ffffff20`,
                      padding: '12px',
                    }}
                  >
                    {/* Image container */}
                    <div className="w-full h-full rounded-full overflow-hidden"
                      style={{
                        background: `linear-gradient(145deg, #1f1633 0%, #0f0a18 100%)`,
                      }}
                    >
                      <img 
                        src="LINKEDINIMAGE.png" 
                        alt="Ross Muretov"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="w-full lg:w-2/3"
              variants={textVariants}
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="text-white">Hello, I'm </span>
                  <span className="text-[#8b5cf6]">Ross Muretov</span>
                </h1>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  I am a highly motivated and adaptable Computer Programming & Analysis student currently in my 5th Semester at Seneca College. I combine a strong academic foundation in full-stack development, database management, cloud computing (AWS), and CI/CD practices with extensive international experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    className="bg-[#111111] p-6 rounded-lg border border-[#222222]"
                    variants={cardVariants}
                  >
                    <div className="flex items-center mb-4">
                      <i className='bx bx-bulb text-2xl text-[#8b5cf6] mr-3'></i>
                      <h3 className="text-xl font-semibold text-white">Key Skills</h3>
                    </div>
                    <ul className="space-y-2 text-gray-400">
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

                  <motion.div 
                    className="bg-[#111111] p-6 rounded-lg border border-[#222222]"
                    variants={cardVariants}
                  >
                    <div className="flex items-center mb-4">
                      <i className='bx bx-target-lock text-2xl text-[#8b5cf6] mr-3'></i>
                      <h3 className="text-xl font-semibold text-white">Career Goals</h3>
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section> // Close motion.section
  );
}
