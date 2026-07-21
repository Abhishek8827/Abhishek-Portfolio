import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    role: 'MERN Stack Developer',
    company: 'Freelance — Self-Employed',
    period: 'Jun 2025 – Present',
    bullets: [
      'Developed and deployed 5+ full-stack MERN applications from requirements gathering through production.',
      'Built NexHRMS — a complete HR management system with 10+ modules, RBAC, and JWT auth.',
      'Delivered responsive UIs with React + Redux Toolkit, and REST APIs with Node.js + Express.',
      'Managed deployments on Vercel (frontend) and Render (backend) with MongoDB Atlas.',
    ],
    color: 'primary',
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Codec Technologies Pvt. Ltd.',
    period: 'Jan 2025',
    bullets: [
      'Completed AICTE & ICAC-approved, 1-month MERN Stack Development internship.',
      'Built and integrated RESTful APIs with JWT-based authentication on live projects.',
      'Collaborated on complex client requirements, consistently exceeding delivery expectations.',
      'Received a Letter of Recommendation from Program Manager Dr. Anurag Shrivastava.',
    ],
    color: 'secondary',
  },
  {
    role: 'Admin Head (In-Charge)',
    company: 'TVSM School, Nepanagar',
    period: '2024 – Present',
    bullets: [
      'Lead end-to-end school administration for 1,000+ students and 50+ teaching & non-teaching staff.',
      'Oversee student admissions, fee collection, record-keeping, and documentation workflows.',
      'Coordinate daily operations across 5+ departments: academics, accounts, transport, and HR.',
      'Digitised all manual record systems, reducing processing time and errors significantly.',
      'Act as primary liaison between school management, parents, staff, and external vendors.',
    ],
    color: 'primary',
  },
  {
    role: 'Computer Instructor',
    company: 'Sunrise Computer Institute & Shree Siddhivinayak Education Group',
    period: '2020 – 2024',
    bullets: [
      'Trained 200+ students in computer fundamentals, MS Office, and basic programming concepts.',
      'Designed and delivered structured curricula covering IT theory and hands-on lab sessions.',
      'Supported internship placement initiatives by coaching students on practical skills.',
    ],
    color: 'secondary',
  },
];

const colorMap: Record<string, { border: string; shadow: string; text: string; bullet: string }> = {
  primary: {
    border:  'border-primary',
    shadow:  'shadow-[0_0_12px_hsl(var(--primary)/0.5)]',
    text:    'text-primary',
    bullet:  'bg-primary/70',
  },
  secondary: {
    border:  'border-secondary',
    shadow:  'shadow-[0_0_12px_hsl(var(--secondary)/0.5)]',
    text:    'text-secondary',
    bullet:  'bg-secondary/70',
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-2">Career journey</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary" />
          </div>

          <div className="relative border-l border-border ml-4 md:ml-8 space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const s = colorMap[exp.color];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 md:pl-12"
                >
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 ${s.border} ${s.shadow}`} />

                  <div className={`text-sm font-medium mb-1.5 ${s.text}`}>{exp.period}</div>
                  <h3 className="text-2xl font-bold mb-0.5 text-foreground">{exp.role}</h3>
                  <h4 className="text-base text-muted-foreground mb-5">{exp.company}</h4>

                  <ul className="space-y-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${s.bullet}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
