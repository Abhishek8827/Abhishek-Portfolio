import { motion } from 'framer-motion';
import { Code2, GraduationCap, Users, Briefcase } from 'lucide-react';

const STATS = [
  { icon: Code2,         value: '5+',    label: 'Projects Deployed' },
  { icon: Users,         value: '200+',  label: 'Students Trained' },
  { icon: GraduationCap, value: '1000+', label: 'Students Managed' },
  { icon: Briefcase,     value: '2+',    label: 'Years Experience' },
];

export default function About() {
  return (
    <section id="about" className="py-28 relative bg-grid-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          {/* Section heading */}
          <div className="mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Who I am</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <div className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-semibold">B.Tech (CSE) graduate</span> and
                self-taught MERN Stack Developer. While juggling college and a full-time admin role,
                I've shipped real, production-grade systems — from HR platforms to cloud file managers.
              </p>
              <p>
                My approach is rooted in problem-solving. Whether architecting a React-Redux frontend
                or managing administrative operations for 1,000+ students, I focus on scalable,
                robust solutions that actually work in production.
              </p>
              <p>
                Currently freelancing and open to full-time opportunities in full-stack web development.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-sm font-medium">
                <a
                  href="mailto:01abhishekwani@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  01abhishekwani@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/abhishekwani0904"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/Abhishek8827"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-neon-cyan transition-all duration-300 group"
                >
                  <stat.icon className="w-6 h-6 text-primary mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
