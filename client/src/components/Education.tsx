import { FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData'; // Import the data

const Education = () => {
  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="education"
      className="flex flex-col min-h-screen items-center justify-center text-gray-200 py-20"
      style={{
        backgroundColor: '#090a0f',
        boxShadow: 'inset 0 0 100px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.03)'
      }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.div
        className="container mx-auto px-4 max-w-5xl"
        variants={cardVariants}
      >
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center tracking-wide text-cyan-200"
          variants={titleVariants}
        >
          Education
        </motion.h2>

        <motion.div 
          className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-2xl"
          variants={cardVariants}
          whileHover={{ 
            boxShadow: '0 15px 50px rgba(0, 194, 194, 0.2), 0 0 30px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            transition: { duration: 0.3 }
          }}
        >
          <div className="p-8 md:p-10 relative">
            <motion.div 
              className="flex flex-col md:flex-row md:items-center mb-6"
              variants={cardVariants}
            >
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <motion.div 
                  className="bg-gray-800 rounded-full p-3 inline-block"
                  style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 15px rgba(0, 194, 194, 0.4)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <FaGraduationCap className="text-3xl text-cyan-300" />
                </motion.div>
              </div>

              <motion.div variants={cardVariants}>
                {/* Use data from resumeData */}
                <h3 className="text-2xl font-semibold text-white mb-1">{resumeData.education.institution}</h3>
                <p className="text-gray-400 mb-1">{resumeData.education.degree}</p>
                <p className="text-gray-500 text-sm">Expected {resumeData.education.graduationDate}</p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-4 text-gray-300"
              variants={cardVariants}
            >
              {/* Use data from resumeData */}
              <motion.p variants={listItemVariants}>
                {resumeData.education.status}. Maintaining a GPA of {resumeData.education.gpa}.
              </motion.p>

              <motion.div variants={listItemVariants}>
                <h4 className="font-medium mb-2 text-cyan-200">Relevant Coursework:</h4>
                {/* Use data from resumeData */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside text-gray-400">
                  {resumeData.education.coursework.map((course, index) => (
                    <motion.li 
                      key={index}
                      variants={listItemVariants}
                      custom={index}
                      transition={{ delay: index * 0.05 }}
                    >
                      {course}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={listItemVariants}>
                <h4 className="font-medium mb-2 text-cyan-200">Achievements:</h4>
                 {/* Use data from resumeData */}
                <ul className="space-y-1 list-disc list-inside text-gray-400">
                  <motion.li variants={listItemVariants}>GPA: {resumeData.education.gpa}</motion.li>
                  <motion.li variants={listItemVariants}>{resumeData.education.honors}</motion.li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Education;