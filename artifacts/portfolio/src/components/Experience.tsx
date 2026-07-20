import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    role: "MERN Stack Developer",
    company: "Freelance",
    period: "Jun 2025 – Present",
    description: "Deployed 5+ full-stack MERN applications from conceptualization to production.",
    color: "primary"
  },
  {
    role: "MERN Stack Developer Intern",
    company: "Codec Technologies Pvt. Ltd.",
    period: "Jan 2025",
    description: "AICTE & ICAC-approved internship. Developed RESTful APIs with JWT authentication. Received Letter of Recommendation from Program Manager Dr. Anurag Shrivastava.",
    color: "secondary"
  },
  {
    role: "Admin Head (In-Charge)",
    company: "TVSM School, Nepanagar",
    period: "2024 – Present",
    description: "Digitized operations and managed administrative tasks for 1000+ students and 50+ staff members.",
    color: "primary"
  },
  {
    role: "Computer Instructor",
    company: "Sunrise Computer Institute",
    period: "2020 – 2024",
    description: "Trained and mentored over 200+ students in computer fundamentals and programming.",
    color: "secondary"
  }
];

const colorMap: Record<string, { border: string; shadow: string; text: string }> = {
  primary: { border: "border-primary", shadow: "shadow-[0_0_15px_hsl(var(--primary))]", text: "text-primary" },
  secondary: { border: "border-secondary", shadow: "shadow-[0_0_15px_hsl(var(--secondary))]", text: "text-secondary" }
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-2">Career journey</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary" />
          </div>

          <div className="relative border-l border-border ml-4 md:ml-8 space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const styles = colorMap[exp.color];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 md:pl-12"
                >
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 ${styles.border} ${styles.shadow}`} />
                  
                  <div className={`text-sm font-mono mb-2 ${styles.text}`}>
                    {exp.period}
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-foreground" style={{ fontFamily: 'var(--app-font-display)' }}>
                    {exp.role}
                  </h3>
                  <h4 className="text-lg text-muted-foreground mb-4">
                    {exp.company}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed bg-card border border-border p-5 rounded-lg">
                    {exp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}