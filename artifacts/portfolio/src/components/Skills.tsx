import { motion } from 'framer-motion';
import { Layers, Server, Database, Wrench, Monitor, Bot, Code2 } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: Code2,
    color: 'primary',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    icon: Layers,
    color: 'secondary',
    skills: ['React.js', 'Redux Toolkit', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Axios', 'Responsive Design'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'primary',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'RBAC', 'bcrypt', 'Multer', 'Cloudinary', 'Socket.io'],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'secondary',
    skills: ['MongoDB', 'MongoDB Atlas', 'Mongoose', 'Firebase Firestore', 'Firebase Storage'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    color: 'primary',
    skills: ['Git', 'GitHub', 'GitHub Actions (CI/CD)', 'VS Code', 'Vercel', 'Render', 'Postman', 'Firebase Hosting'],
  },
  {
    title: 'AI & Productivity',
    icon: Bot,
    color: 'secondary',
    skills: ['Claude AI', 'ChatGPT', 'Gemini AI', 'Prompt Engineering', 'AI-assisted Debugging'],
  },
  {
    title: 'Other',
    icon: Monitor,
    color: 'primary',
    skills: ['WordPress', 'Tally Prime & ERP 9', 'Adobe Photoshop', 'CorelDraw', 'MS Office Suite'],
  },
];

const colorMap: Record<string, { border: string; shadow: string; iconBg: string; iconColor: string; tagBg: string }> = {
  primary: {
    border:    'hover:border-primary/50',
    shadow:    'hover:shadow-neon-cyan',
    iconBg:    'bg-primary/10',
    iconColor: 'text-primary',
    tagBg:     'bg-primary/8 border-primary/15 text-primary/80 hover:bg-primary/15 hover:text-primary',
  },
  secondary: {
    border:    'hover:border-secondary/50',
    shadow:    'hover:shadow-neon-purple',
    iconBg:    'bg-secondary/10',
    iconColor: 'text-secondary',
    tagBg:     'bg-secondary/8 border-secondary/15 text-secondary/80 hover:bg-secondary/15 hover:text-secondary',
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
          className="max-w-6xl mx-auto"
        >
          {/* Section heading */}
          <div className="mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
              What I work with
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Skills</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SKILL_CATEGORIES.map((category, idx) => {
              const c = colorMap[category.color];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  className={`p-5 rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 ${c.border} ${c.shadow}`}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className={`p-1.5 rounded-lg ${c.iconBg}`}>
                      <category.icon className={`w-4 h-4 ${c.iconColor}`} />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-0.5 rounded-md text-xs font-medium border transition-colors cursor-default ${c.tagBg}`}
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
