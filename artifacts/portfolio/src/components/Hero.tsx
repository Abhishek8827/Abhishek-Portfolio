import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { ArrowDown, Download, Sparkles } from 'lucide-react';

const TITLES = [
  'MERN Stack Developer',
  'Full-Stack Engineer',
  'React & Node.js Expert',
  'Freelance Developer',
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentTitle.length) {
            setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % TITLES.length);
          }
        }
      },
      isDeleting ? 45 : 95,
    );
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* 3D / CSS background scene */}
      <ThreeScene />

      {/* Dark overlay to improve text contrast over the 3D scene */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(5,8,22,0.25) 0%, rgba(5,8,22,0.55) 100%)' }} />

      <div className="container mx-auto px-4 text-center" style={{ zIndex: 2, position: 'relative' }}>
        {/* Glass card behind text for readability */}
        <div className="inline-block w-full max-w-3xl mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium tracking-wide text-primary">Available for opportunities</span>
            <Sparkles className="w-3.5 h-3.5 text-primary/60" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7), 0 0 40px rgba(0,200,255,0.15)' }}
          >
            Abhishek Wani
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-12 flex items-center justify-center mb-10"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-primary drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
              {displayedText}
              <span className="ml-0.5 inline-block w-0.5 h-6 bg-primary align-middle animate-pulse" />
            </h2>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto"
          >
            <a href="#projects"
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200">
              View My Work
            </a>
            <a href="resume.pdf" target="_blank" rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-semibold bg-white/8 border border-white/15 text-white hover:bg-white/14 hover:border-white/25 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download CV
            </a>
          </motion.div>

          {/* Interaction hint */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
            className="mt-8 text-xs text-white/30 tracking-wide">
            Drag or click the model to interact
          </motion.p>
        </div>
      </div>

      {/* Scroll down arrow */}
      <motion.a href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-primary transition-colors animate-bounce"
        style={{ zIndex: 2 }}>
        <ArrowDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
}
