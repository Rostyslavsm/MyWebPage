import { resumeData } from "@/data/resumeData";
import { motion } from "framer-motion";

export default function Languages() {
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

  return (
    <motion.section 
      className="py-16 bg-neutral/30"
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
          <h2 className="text-3xl font-bold text-white">Languages</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
          variants={cardContainerVariants}
        >
          {resumeData.languages.map((language, index) => (
            <motion.div 
              key={index} 
              className="w-full sm:w-64 bg-white p-6 rounded-lg shadow-sm text-center"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px rgba(139, 92, 246, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.i 
                  className='bx bx-message-alt-detail text-3xl text-primary'
                  whileHover={{ 
                    rotate: 10,
                    scale: 1.1,
                    transition: { duration: 0.2, yoyo: Infinity }
                  }}
                ></motion.i>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-secondary mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: false }}
              >
                {language.name}
              </motion.h3>
              <motion.span 
                className={`inline-block px-4 py-2 ${language.level === 'Fluent' ? 'bg-primary' : 'bg-secondary/70'} text-white rounded-full font-medium`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                viewport={{ once: false }}
                whileHover={{ scale: 1.05 }}
              >
                {language.level}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
