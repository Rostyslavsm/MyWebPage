import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-white to-neutral/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-2/3 flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary">
              Hi, I'm <span className="text-primary">Rostyslav (Ross) Muretov</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-secondary/80">
              Computer Programming & Analysis Student | Aspiring Software Developer
            </h2>
            <p className="text-lg text-secondary/70 max-w-2xl">
              Seeking a challenging Co-op opportunity within the tech industry. Combining strong academic foundation with international experience and exceptional communication skills.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#contact">
                <Button className="px-6 py-6 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-medium flex items-center gap-2 h-auto">
                  <i className='bx bx-envelope'></i> Contact Me
                </Button>
              </a>
              <a href="#projects">
                <Button variant="outline" className="px-6 py-6 border-2 border-primary text-white rounded-lg hover:bg-secondary/80 transition-colors font-medium flex items-center gap-2 h-auto">
                  <i className='bx bx-code-alt'></i> View My Work
                </Button>
              </a>
              <a href="/Rostyslav_Muretov_CV.pdf" download>
                <Button variant="secondary" className="px-6 py-6 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors font-medium flex items-center gap-2 h-auto">
                  <i className='bx bxs-download'></i> Download CV
                </Button>
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="mailto:muretovr@gmail.com" className="text-secondary hover:text-primary transition-colors">
                <i className='bx bx-envelope text-2xl'></i>
              </a>
              <a href="https://github.com/Rostyslavsm" className="text-secondary hover:text-primary transition-colors">
                <i className='bx bxl-github text-2xl'></i>
              </a>
              <a href="https://linkedin.com/in/rostyslav-muretov-062a84202/" className="text-secondary hover:text-primary transition-colors">
                <i className='bx bxl-linkedin text-2xl'></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-60 h-60 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img 
                src="LINKEDINIMAGE.jpeg" 
                alt="Ross Muretov"
                className="absolute w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
