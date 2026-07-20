import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';

const EDUCATION = [
  {
    degree: "B.Tech Computer Science & Engineering",
    school: "SDITS, Khandwa (RGPV)",
    year: "2023–2026",
    score: "CGPA 7.3/10"
  },
  {
    degree: "Diploma in Computer Science",
    school: "TSEC Polytechnic, Burhanpur (RGPV)",
    year: "2020–2023",
    score: "CGPA 8.7/10"
  },
  {
    degree: "Secondary (10th)",
    school: "Citizen H.S. School, Nepanagar",
    year: "2020",
    score: "72.6%"
  }
];

const CERTIFICATIONS = [
  { name: "MERN Stack Development", issuer: "Codec Technologies", date: "Nov 2025" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Mar 2023" },
  { name: "Cybersecurity", issuer: "Tech Mahindra / Skill India", date: "Feb 2024" },
  { name: "Digital Marketing", issuer: "Google Digital Garage", date: "Sep 2021" }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative bg-grid-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" style={{ fontFamily: 'var(--app-font-display)' }}>
              // DATA_BANKS
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: 'var(--app-font-display)' }}>Education</h3>
              </div>
              
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
                      <h4 className="text-lg font-bold text-foreground">{edu.degree}</h4>
                      <span className="text-primary font-mono text-xs whitespace-nowrap bg-primary/10 px-2 py-1 rounded border border-primary/20">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{edu.school}</p>
                    <div className="inline-block px-3 py-1 bg-white/5 rounded border border-white/10 font-mono text-sm text-secondary">
                      {edu.score}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-secondary" />
                <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: 'var(--app-font-display)' }}>Certifications</h3>
              </div>

              <div className="grid gap-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg border border-border bg-card hover:border-secondary hover:shadow-neon-purple transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-secondary transition-colors">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 font-mono text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/10">
                      {cert.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}