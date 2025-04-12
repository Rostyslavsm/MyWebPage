import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingNeonLight from "./ui/FloatingNeonLight";
import backgroundImage from "@/assets/background.jpg";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#0a0a0a]/90 text-white">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.3, // Increased opacity for more visibility
        }}
      />
      
      {/* Dark overlay for better text contrast */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black opacity-50"></div>
      
      <FloatingNeonLight />
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}