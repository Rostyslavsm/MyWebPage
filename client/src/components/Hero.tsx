import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-2/3 flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Hi, I'm <span className="text-[#8b5cf6]">Rostyslav (Ross) Muretov</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-gray-300">
              Computer Programming & Analysis Student | Aspiring Software Developer
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Seeking a challenging Co-op opportunity within the tech industry. Combining strong academic foundation with international experience and exceptional communication skills.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#contact">
                <Button className="px-6 py-6 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#9f75ff] transition-colors font-medium flex items-center gap-2 h-auto">
                  <i className='bx bx-envelope'></i> Contact Me
                </Button>
              </a>
              <a href="#projects">
                <Button variant="outline" className="px-6 py-6 border-2 border-[#8b5cf6] text-white rounded-lg hover:bg-[#8b5cf6]/10 transition-colors font-medium flex items-center gap-2 h-auto">
                  <i className='bx bx-code-alt'></i> View My Work
                </Button>
              </a>
              <a href="/Rostyslav_Muretov_CV.pdf" download>
                <Button variant="secondary" className="px-6 py-6 bg-[#111111] text-white rounded-lg hover:bg-[#222222] transition-colors font-medium flex items-center gap-2 h-auto">
                  <i className='bx bxs-download'></i> Download CV
                </Button>
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <a href="mailto:muretovr@gmail.com" className="text-gray-400 hover:text-[#8b5cf6] transition-colors">
                <i className='bx bx-envelope text-2xl'></i>
              </a>
              <a href="https://github.com/Rostyslavsm" className="text-gray-400 hover:text-[#8b5cf6] transition-colors">
                <i className='bx bxl-github text-2xl'></i>
              </a>
              <a href="https://linkedin.com/in/rostyslav-muretov-062a84202/" className="text-gray-400 hover:text-[#8b5cf6] transition-colors">
                <i className='bx bxl-linkedin text-2xl'></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="card relative">
              <div className="circle before:content-[''] before:absolute before:top-[30px] before:left-[2px] before:right-[2px] before:w-[350px] before:h-[350px] before:rounded-full before:bg-[#111111] before:border-8 before:border-[#8b5cf6] before:transition-all before:duration-500 before:shadow-[0_0_50px_#8b5cf6] before:[animation:pulse_4s_ease-in-out_infinite]">
                <div className="relative w-[350px] h-[350px] rounded-full overflow-hidden z-10 top-[30px]">
                  <img 
                    src="LINKEDINIMAGE.png" 
                    alt="Ross Muretov"
                    className="absolute w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
