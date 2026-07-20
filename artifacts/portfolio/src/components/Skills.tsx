import { motion } from 'framer-motion';
import { Terminal, Database, Layout, Wrench, Monitor } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: Layout,
    color: "primary",
    skills: ["React.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "JavaScript ES6+"]
  },
  {
    title: "Backend",
    icon: Terminal,
    color: "secondary",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth"]
  },
  {
    title: "Database",
    icon: Database,
    color: "primary",
    skills: ["MongoDB", "Firebase Firestore", "Mongoose"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "secondary",
    skills: ["Git", "GitHub", "GitHub Actions", "Vercel", "Render", "Postman"]
  },
  {
    title: "Other",
    icon: Monitor,
    color: "primary",
    skills: ["WordPress", "Adobe Photoshop", "CorelDraw"]
  }
];

const colorClasses: Record<string, { borderHover: string; shadowHover: string; text: string; bgHover: string }> = {
  primary: {
    borderHover: "hover:border-primary",
    shadowHover: "hover:shadow-neon-cyan",
    text: "text-primary",
    bgHover: "hover:bg-primary/5"
  },
  secondary: {
    borderHover: "hover:border-secondary",
    shadowHover: "hover:shadow-neon-purple",
    text: "text-secondary",
    bgHover: "hover:bg-secondary/5"
  }
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16 flex-row-reverse">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary" style={{ fontFamily: 'var(--app-font-display)' }}>
              SYSTEM_SPECS //
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-secondary/50 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => {
              const styles = colorClasses[category.color];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${styles.borderHover} ${styles.shadowHover} ${styles.bgHover}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className={`w-6 h-6 ${styles.text}`} />
                    <h3 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--app-font-display)' }}>
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}