import { resumeData } from "@/data/resumeData";

export default function Education() {
  return (
    <section id="education" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Education</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111111] p-8 rounded-lg border border-[#222222]">
            <div className="flex items-start">
              <div className="hidden sm:block mr-6">
                <div className="w-16 h-16 bg-[#8b5cf6] rounded-lg flex items-center justify-center">
                  <i className='bx bxs-graduation text-3xl text-white'></i>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{resumeData.education.degree}</h3>
                  <span className="px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mt-2 sm:mt-0">Expected {resumeData.education.graduationDate}</span>
                </div>
                <p className="text-gray-400 text-lg mb-3">{resumeData.education.institution}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <i className='bx bx-medal text-[#8b5cf6] mr-2'></i>
                      <h4 className="font-semibold text-white">Current Status & Achievements</h4>
                    </div>
                    <ul className="space-y-2 ml-5 list-disc text-gray-400">
                      <li>{resumeData.education.status}</li>
                      <li>GPA: {resumeData.education.gpa}</li>
                      <li>{resumeData.education.honors}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <i className='bx bx-book-open text-[#8b5cf6] mr-2'></i>
                      <h4 className="font-semibold text-white">Key Coursework</h4>
                    </div>
                    <ul className="space-y-2 ml-5 list-disc text-gray-400">
                      {resumeData.education.coursework.map((course, index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
