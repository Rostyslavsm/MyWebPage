import { FaGraduationCap } from 'react-icons/fa';
// Removed: import { useInView } from 'react-intersection-observer';
// Removed: import { useEffect } from 'react';
import { resumeData } from '../data/resumeData'; // Import the data

const Education = () => {
  // Removed: useInView hook logic
  // const { ref, inView } = useInView({
  //   threshold: 0.2,
  //   triggerOnce: false,
  // });

  // Removed: useEffect for dispatching custom event
  // useEffect(() => {
  //   const educationEvent = new CustomEvent('educationInView', {
  //     detail: { isVisible: inView }
  //   });
  //   window.dispatchEvent(educationEvent);
  // }, [inView]);

  // Determine the static styles that were previously conditional
  // We'll apply the styles that were used when 'inView' was true
  const sectionInViewStyle = {
    backgroundColor: '#090a0f',
    boxShadow: 'inset 0 0 100px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.03)'
  };

  const containerInViewStyle = {
    transform: 'translateY(0)', // Static final position
    opacity: 1, // Static final opacity
  };

  const iconContainerInViewStyle = {
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
  };

  const cardInViewStyle = {
      boxShadow: '0 10px 40px rgba(0, 194, 194, 0.15), 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  };


  return (
    <section
      // Removed: ref={ref}
      id="education"
      // Updated: Removed transition classes that depended on inView toggling state
      //          Kept py-20 for padding, applied static styles
      className="flex flex-col min-h-screen items-center justify-center text-gray-200 py-20"
      style={sectionInViewStyle} // Apply static "in view" styles
    >
      <div
        // Updated: Removed transition classes, applied static styles
        className="container mx-auto px-4 max-w-5xl"
        style={containerInViewStyle} // Apply static "in view" styles
      >
        <h2 className="text-4xl font-bold mb-16 text-center tracking-wide text-cyan-200">
          Education
        </h2>

        {/* Updated: Removed transition classes, applied static styles */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-2xl"
          style={cardInViewStyle} // Apply static "in view" styles
        >
          <div className="p-8 md:p-10 relative">
            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                 {/* Updated: Applied static styles */}
                <div className="bg-gray-800 rounded-full p-3 inline-block"
                  style={iconContainerInViewStyle} // Apply static "in view" styles
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