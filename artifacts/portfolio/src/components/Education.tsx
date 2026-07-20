import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';

const EDUCATION = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'SDITS, Khandwa (RGPV, Bhopal)',
    year: '2023 – 2026',
    score: 'CGPA 7.2 / 10',
    status: 'Completed',
  },
  {
    degree: 'Diploma in Computer Science',
    school: 'TSEC Polytechnic College, Burhanpur (RGPV)',
    year: '2020 – 2023',
    score: 'CGPA 8.7 / 10',
    status: 'Completed',
  },
  {
    degree: 'Secondary Education (10th)',
    school: 'Citizen H.S. School, Nepanagar',
    year: '2020',
    score: '72.6%',
    status: 'Completed',
  },
];

const CERTIFICATIONS = [
  { name: 'MERN Stack Development', issuer: 'Codec Technologies (ICAC-recognised)', date: 'Nov 2025' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp (~300 hrs)', date: 'Mar 2023' },
  { name: 'Cybersecurity', issuer: 'Tech Mahindra / Skill India (NSDC)', date: 'Feb 2024' },
  { name: 'Fundamentals of Digital Marketing', issuer: 'Google Digital Garage (IAB endorsed)', date: 'Sep 2021' },
];

export default function Education() {
  return (
    <section id="education" className="py-28 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          {/* Section heading */}
          <div className="mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              Academic background
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Education</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education cards */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Degrees</h3>
              </div>
              <div className="space-y-5">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-neon-cyan transition-all duration-300"
                  >
                    <div className="flex flex-col gap-1 mb-3">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base font-semibold text-foreground leading-snug">{edu.degree}</h4>
                        <span className="shrink-0 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.school}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{edu.year}</span>
                      <span className="text-sm font-semibold text-secondary">{edu.score}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
              </div>
              <div className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl border border-border bg-card hover:border-secondary/40 hover:shadow-neon-purple transition-all duration-300"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground font-medium bg-muted/50 px-2.5 py-1 rounded-lg border border-border">
                      {cert.date}
                    </span>
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
