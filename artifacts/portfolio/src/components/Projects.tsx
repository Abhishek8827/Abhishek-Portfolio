import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2, Star } from 'lucide-react';

const PROJECTS = [
  {
    title: 'NexHRMS',
    subtitle: 'Full-Stack HR Management System',
    description:
      'Challenge: fragmented HR processes and manual payroll made compliance and reporting slow and error-prone. Built an end-to-end HRMS with role-based access, payroll automation, attendance, leave workflows, onboarding, and analytics. Engineered 30+ secure APIs with JWT refresh rotation to reduce admin overhead and improve data reliability.',
    tech: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/Abhishek8827/NexHRMS',
    live: 'https://nexhr-api.vercel.app',
    featured: true,
  },
  {
    title: 'Cloudy',
    subtitle: 'Cloud File Manager (Google Drive Clone)',
    description:
      'Challenge: scattered cloud storage and inefficient file workflows reduced productivity. Built a Google Drive-style file manager with secure authentication, real-time uploads, metadata search, and an AI assistant for conversational file operations. Delivered a polished, searchable workspace that improves how users store and access files.',
    tech: ['React.js', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'Gemini AI', 'GitHub Actions'],
    github: 'https://github.com/Abhishek8827/Cloudy',
    live: '',
    featured: true,
  },
  {
    title: 'TVSM School System',
    subtitle: 'Digital School Management System',
    description:
      'Challenge: manual school administration created data silos across academics, attendance, accounts, transport, and staff. Built a centralised system for 100+ users with automated workflows, attendance tracking, fee management, and reporting dashboards. Reduced paperwork and improved visibility for teachers, administrators, and parents.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    github: '',
    live: '',
    featured: false,
  },
  {
    title: 'LensCulture',
    subtitle: 'Responsive Photo Gallery',
    description:
      'Challenge: inconsistent portfolio presentation weakened visual impact on mobile and desktop. Built a responsive photo gallery with category filters, immersive lightbox viewing, and lazy-loaded assets. Optimised performance and UX to create a more engaging showcase for photographers.',
    tech: ['JavaScript', 'Bootstrap', 'Tailwind CSS', 'HTML5', 'CSS3'],
    github: '',
    live: '',
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative bg-grid-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto"
        >
          {/* Section heading */}
          <div className="mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">What I've built</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Projects</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative flex flex-col justify-between p-7 rounded-2xl bg-card border transition-all duration-300 overflow-hidden hover:-translate-y-1 ${
                  project.featured
                    ? 'border-primary/40 hover:border-primary/70 hover:shadow-neon-cyan'
                    : 'border-border hover:border-secondary/40 hover:shadow-neon-purple'
                }`}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  project.featured
                    ? 'bg-gradient-to-br from-primary/8 via-transparent to-secondary/8'
                    : 'bg-gradient-to-br from-secondary/6 via-transparent to-primary/6'
                }`} />

                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className={`w-8 h-8 ${project.featured ? 'text-primary' : 'text-secondary'}`} />
                      {project.featured && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="GitHub">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Live Demo">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary font-medium mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Tech stack */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-5 border-t border-border/50">
                  {project.tech.map((tech) => (
                    <span key={tech}
                      className={`text-xs font-medium px-2 py-0.5 rounded-lg border ${
                        project.featured
                          ? 'text-primary/80 bg-primary/8 border-primary/15'
                          : 'text-secondary/80 bg-secondary/8 border-secondary/15'
                      }`}>
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
