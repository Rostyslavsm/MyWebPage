import { resumeData } from "@/data/resumeData";

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-neutral/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Programming Languages */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <i className='bx bx-code-alt text-2xl text-primary mr-3'></i>
              <h3 className="text-xl font-semibold">Programming Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.programmingLanguages.map((lang, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          {/* Databases */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <i className='bx bx-data text-2xl text-primary mr-3'></i>
              <h3 className="text-xl font-semibold">Databases</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.databases.map((db, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {db}
                </span>
              ))}
            </div>
          </div>
          
          {/* Cloud Technologies */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <i className='bx bx-cloud text-2xl text-primary mr-3'></i>
              <h3 className="text-xl font-semibold">Cloud Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.cloudTechnologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Development Tools */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <i className='bx bx-wrench text-2xl text-primary mr-3'></i>
              <h3 className="text-xl font-semibold">Development Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.developmentTools.map((tool, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          {/* Operating Systems */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <i className='bx bx-desktop text-2xl text-primary mr-3'></i>
              <h3 className="text-xl font-semibold">Operating Systems</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.operatingSystems.map((os, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {os}
                </span>
              ))}
            </div>
          </div>
          
          {/* Methodologies & Concepts */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <i className='bx bx-brain text-2xl text-primary mr-3'></i>
              <h3 className="text-xl font-semibold">Methodologies & Concepts</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.methodologies.map((method, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
