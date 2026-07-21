import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import SparkleEffect from './components/SparkleEffect';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <main className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />

      <footer className="py-10 text-center border-t border-border/40 bg-background">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Abhishek Wani — All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/40 mt-2 tracking-widest uppercase">
          Built with React, Vite, Tailwind CSS and polished for portfolio presentation
        </p>
      </footer>

      <SparkleEffect />
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Portfolio />
      <ScrollToTop />
      <Toaster />
    </QueryClientProvider>
  );
}
