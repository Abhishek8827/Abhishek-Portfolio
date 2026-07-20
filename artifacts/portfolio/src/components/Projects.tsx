import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

const PROJECTS = [
  {
    title: "NexHRMS",
    subtitle: "Full-Stack HR Management System",
    description: "Comprehensive HR platform featuring 10+ modules, 30+ APIs, and RBAC with 4-tier hierarchy. Built with glassmorphism UI.",
    tech: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/Abhishek8827/NexHRMS",
    live: "https://nexhr-api.vercel.app",
    featured: true
  },
  {
    title: "Cloudy",
    subtitle: "Cloud File Manager (Google Drive Clone)",
    description: "Real-time file uploads, AI assistance panel with Gemini AI, Google SSO authentication, and CI/CD via GitHub Actions.",
    tech: ["React.js", "Firebase", "Gemini AI", "GitHub Actions"],
    github: "https://github.com/Abhishek8827/Cloudy",
    live: "#"
  },
  {
    title: "TVSM School",
    subtitle: "Digital School Management System",
    description: "Replaced manual administrative tasks with a complete digital solution managing 1000+ students and 50+ staff.",
    tech: ["MERN Stack", "Tailwind CSS"],
    github: "#",
    live: "#"
  },
  {
    title: "LensCulture",
    subtitle: "Responsive Photo Gallery",
    description: "Filterable photography portfolio with categories, a lightbox viewer, and mobile-optimized layouts.",
    tech: ["JavaScript", "Bootstrap", "Tailwind CSS"],
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-grid-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">What I've built</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Projects</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative flex flex-col justify-between p-8 rounded-xl bg-card border ${
                  project.featured ? 'border-primary/50 shadow-[0_0_15px_rgba(0,245,255,0.1)]' : 'border-border'
                } hover:border-primary transition-all duration-500 overflow-hidden`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <FolderGit2 className={`w-10 h-10 ${project.featured ? 'text-primary' : 'text-secondary'}`} />
                    <div className="flex gap-4">
                      {project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.live !== "#" && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--app-font-display)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary font-mono mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}