import { FaGraduationCap } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { resumeData } from '../data/resumeData'; // Import the data

const Education = () => {
  // Using react-intersection-observer to detect when the component is in view
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the element is visible
    triggerOnce: false, // Keep tracking visibility changes
  });

  // Dispatch custom event when education section comes into view
  useEffect(() => {
    // Create and dispatch custom event
    const educationEvent = new CustomEvent('educationInView', {
      detail: { isVisible: inView }
    });
    window.dispatchEvent(educationEvent);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="education"
      className="flex flex-col min-h-screen items-center justify-center text-gray-200 py-20 transition-all duration-1000 ease-in-out"
      style={{
        backgroundColor: '#090a0f',
        boxShadow: inView
          ? 'inset 0 0 100px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.03)'
          : 'none'
      }}
    >
      <div
        className="container mx-auto px-4 max-w-5xl transition-all duration-1000"
        style={{
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          opacity: inView ? 1 : 0,
        }}
      >
        <h2 className="text-4xl font-bold mb-16 text-center tracking-wide text-cyan-200">
          Education
        </h2>

        <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out"
          style={{
            boxShadow: inView
              ? '0 10px 40px rgba(0, 194, 194, 0.15), 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              : '0 4px 20px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="p-8 md:p-10 relative">
            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="bg-gray-800 rounded-full p-3 inline-block"
                  style={{
                    boxShadow: inView ? '0 0 10px rgba(255, 255, 255, 0.2)' : 'none',
                  }}
                >
                  <FaGraduationCap className="text-3xl text-cyan-300" />
                </div>
              </div>

              <div>
                {/* Use data from resumeData */}
                <h3 className="text-2xl font-semibold text-white mb-1">{resumeData.education.institution}</h3>
                <p className="text-gray-400 mb-1">{resumeData.education.degree}</p>
                <p className="text-gray-500 text-sm">Expected {resumeData.education.graduationDate}</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300">
              {/* Use data from resumeData */}
              <p>
                {resumeData.education.status}. Maintaining a GPA of {resumeData.education.gpa}.
              </p>

              <div>
                <h4 className="font-medium mb-2 text-cyan-200">Relevant Coursework:</h4>
                {/* Use data from resumeData */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside text-gray-400">
                  {resumeData.education.coursework.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-cyan-200">Achievements:</h4>
                 {/* Use data from resumeData */}
                <ul className="space-y-1 list-disc list-inside text-gray-400">
                  <li>GPA: {resumeData.education.gpa}</li>
                  <li>{resumeData.education.honors}</li>
                  {/* Add other achievements if available in data or keep static ones if needed */}
                  {/* Example static achievement if needed:
                  <li>2nd place in University Programming Contest (2022)</li>
                  */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
