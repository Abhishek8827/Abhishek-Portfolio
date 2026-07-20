import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { ArrowDown, Download, Terminal } from 'lucide-react';

const TITLES = [
  "MERN Stack Developer",
  "Full-Stack Engineer",
  "React & Node.js Expert"
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
      <ThreeScene />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
        >
          <Terminal className="w-4 h-4" />
          <span className="text-xs font-mono tracking-wider text-neon-cyan">SYSTEM.ONLINE</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
          style={{ fontFamily: 'var(--app-font-display)' }}
        >
          ABHISHEK WANI
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 flex items-center justify-center mb-10"
        >
          <h2 className="text-xl md:text-3xl font-mono text-secondary text-neon-purple">
            &gt; {displayedText}<span className="animate-pulse">_</span>
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a 
            href="#projects" 
            className="w-full sm:w-auto flex-1 px-8 py-3 rounded text-primary-foreground font-bold bg-primary hover:shadow-neon-cyan transition-all uppercase tracking-widest text-sm"
          >
            View My Work
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="w-full sm:w-auto flex-1 px-8 py-3 rounded bg-transparent border border-secondary text-secondary font-bold hover:bg-secondary/10 hover:shadow-neon-purple transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download CV
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}