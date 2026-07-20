import { motion } from 'framer-motion';
import { User, Code2, GraduationCap, Briefcase } from 'lucide-react';

const STATS = [
  { icon: Code2, value: "5+", label: "Projects Deployed" },
  { icon: User, value: "200+", label: "Students Trained" },
  { icon: GraduationCap, value: "1000+", label: "Students Managed" },
  { icon: Briefcase, value: "2+", label: "Years Experience" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-grid-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" style={{ fontFamily: 'var(--app-font-display)' }}>
              // ABOUT_ME
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-mono">
              <p>
                I'm a <span className="text-primary font-bold">Final-Year B.Tech (CSE) student</span> and self-taught MERN Stack Developer. While juggling college, I've shipped real, production-grade systems—from HR platforms to cloud file managers.
              </p>
              <p>
                My approach is deeply rooted in problem-solving. Whether I'm managing administrative operations for 1000+ students or architecting a React-Redux frontend, I focus on scalable, robust solutions that feel electric.
              </p>
              <div className="pt-4 flex gap-4 text-sm font-bold uppercase tracking-widest">
                <a href="mailto:01abhishekwani@gmail.com" className="text-primary hover:text-neon-cyan transition-colors">Email</a>
                <span className="text-border">|</span>
                <a href="https://linkedin.com/in/abhishekwani0904" target="_blank" rel="noreferrer" className="text-primary hover:text-neon-cyan transition-colors">LinkedIn</a>
                <span className="text-border">|</span>
                <a href="https://github.com/Abhishek8827" target="_blank" rel="noreferrer" className="text-primary hover:text-neon-cyan transition-colors">GitHub</a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-card/80 backdrop-blur border border-border hover:border-primary/50 hover:shadow-neon-cyan transition-all group"
                >
                  <stat.icon className="w-8 h-8 text-secondary mb-4 group-hover:text-primary transition-colors" />
                  <div className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--app-font-display)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}