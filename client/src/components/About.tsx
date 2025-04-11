import { motion } from "framer-motion"; // Import motion

export default function About() {
  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and slightly down
    visible: {
      opacity: 1,
      y: 0, // Animate to visible and original position
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">About Me</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            I am a highly motivated and adaptable Computer Programming & Analysis student currently in my 5th Semester at Seneca College. I combine a strong academic foundation in full-stack development, database management, cloud computing (AWS), and CI/CD practices with extensive international experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-[#111111] p-6 rounded-lg border border-[#222222]">
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
            </div>

            <div className="bg-[#111111] p-6 rounded-lg border border-[#222222]">
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
            </div>
          </div>
        </div>
      </div>
    </motion.section> // Close motion.section
  );
}
