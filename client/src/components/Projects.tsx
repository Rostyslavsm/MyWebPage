import { resumeData } from "@/data/resumeData";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="bg-[#111111] rounded-lg overflow-hidden border border-[#222222] transition-all duration-300 hover:border-[#8b5cf6]/50">
              <div className="h-48 bg-[#0a0a0a] flex items-center justify-center">
                <i className={`bx ${project.icon} text-6xl text-[#8b5cf6]/30`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1 ml-5 list-disc text-gray-400">
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <h4 className="font-semibold text-white mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {project.liveDemo && (
                    <a href={project.liveDemo} className="text-[#8b5cf6] hover:text-[#9f75ff] flex items-center transition-colors">
                      <i className='bx bx-link-external mr-1'></i> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="text-[#8b5cf6] hover:text-[#9f75ff] flex items-center transition-colors">
                      <i className='bx bxl-github mr-1'></i> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
