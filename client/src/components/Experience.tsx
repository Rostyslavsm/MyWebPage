import { resumeData } from "@/data/resumeData";

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#222222]"></div>
            
            {resumeData.experience.map((job, index) => (
              <div key={index} className="relative z-10 mb-12">
                <div className="hidden md:flex items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#222222] bg-[#111111] absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-3 bg-[#8b5cf6] rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative md:flex items-center justify-between">
                  {index % 2 === 0 ? (
                    <>
                      <div className="hidden md:block w-5/12"></div>
                      <div className="md:w-5/12 bg-[#111111] p-6 rounded-lg border border-[#222222] ml-0 md:ml-auto">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mt-2 sm:mt-0">{job.period}</span>
                        </div>
                        <h4 className="text-lg text-gray-400 mb-3">{job.company} | {job.location}</h4>
                        <ul className="space-y-2 ml-5 list-disc text-gray-400">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-5/12 bg-[#111111] p-6 rounded-lg border border-[#222222] mr-0 md:mr-auto">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <span className="inline-block px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-sm font-medium mt-2 sm:mt-0">{job.period}</span>
                        </div>
                        <h4 className="text-lg text-gray-400 mb-3">{job.company} | {job.location}</h4>
                        <ul className="space-y-2 ml-5 list-disc text-gray-400">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden md:block w-5/12"></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
