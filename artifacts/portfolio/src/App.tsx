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
      
      <footer className="py-8 text-center border-t border-border/50 bg-background">
        <p className="text-muted-foreground font-mono text-sm">
          &copy; {new Date().getFullYear()} Abhishek Wani. All rights reserved.
          <br/>
          <span className="text-xs text-primary/50 mt-2 block tracking-widest uppercase">Designed & Built with React, Three.js & Tailwind</span>
        </p>
      </footer>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Portfolio />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;