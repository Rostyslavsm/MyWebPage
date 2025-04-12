import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingNeonLight from './ui/FloatingNeonLight';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <FloatingNeonLight />
      <Header />
      <main className="flex-grow z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
