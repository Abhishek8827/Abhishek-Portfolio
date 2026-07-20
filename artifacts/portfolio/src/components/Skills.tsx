import { motion } from 'framer-motion';
import { Layers, Server, Database, Wrench, Monitor } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: Layers,
    color: 'primary',
    skills: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3', 'JavaScript ES6+'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'secondary',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'RBAC'],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'primary',
    skills: ['MongoDB', 'Firebase Firestore', 'MongoDB Atlas', 'Mongoose'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    color: 'secondary',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Vercel', 'Render', 'Postman'],
  },
  {
    title: 'Other',
    icon: Monitor,
    color: 'primary',
    skills: ['WordPress', 'Adobe Photoshop', 'CorelDraw', 'MS Office'],
  },
];

const colorMap: Record<string, { border: string; shadow: string; iconColor: string; tagBg: string }> = {
  primary: {
    border: 'hover:border-primary/50',
    shadow: 'hover:shadow-neon-cyan',
    iconColor: 'text-primary',
    tagBg: 'bg-primary/8 border-primary/15 text-primary/80 hover:bg-primary/15 hover:text-primary',
  },
  secondary: {
    border: 'hover:border-secondary/50',
    shadow: 'hover:shadow-neon-purple',
    iconColor: 'text-secondary',
    tagBg: 'bg-secondary/8 border-secondary/15 text-secondary/80 hover:bg-secondary/15 hover:text-secondary',
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          {/* Section heading */}
          <div className="mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
              What I work with
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Skills</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category, idx) => {
              const c = colorMap[category.color];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.shadow}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2 rounded-lg bg-card border border-border`}>
                      <category.icon className={`w-4 h-4 ${c.iconColor}`} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-default ${c.tagBg}`}
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
