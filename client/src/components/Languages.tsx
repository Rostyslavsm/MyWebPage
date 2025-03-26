import { resumeData } from "@/data/resumeData";

export default function Languages() {
  return (
    <section className="py-16 bg-neutral/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary">Languages</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-2"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {resumeData.languages.map((language, index) => (
            <div key={index} className="w-full sm:w-64 bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className='bx bx-message-alt-detail text-3xl text-primary'></i>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">{language.name}</h3>
              <span className={`inline-block px-4 py-2 ${language.level === 'Fluent' ? 'bg-primary' : 'bg-secondary/70'} text-white rounded-full font-medium`}>
                {language.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
