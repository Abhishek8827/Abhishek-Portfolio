import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

// ─── Waving Avatar SVG ────────────────────────────────────────────────────────

function WavingAvatar() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 160 250"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-64 drop-shadow-2xl"
        aria-hidden
      >
        <defs>
          <radialGradient id="aura" cx="50%" cy="55%" r="50%">
            <stop offset="0%"   stopColor="#00f5ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="face" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#c4b0f5" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="suit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Background aura */}
        <circle cx="80" cy="130" r="95" fill="url(#aura)" />

        {/* Body — bobs up/down */}
        <g style={{ animation: 'avatarBob 3.5s ease-in-out infinite', transformOrigin: '80px 150px' }}>
          {/* Hair */}
          <ellipse cx="80" cy="40" rx="37" ry="15" fill="#1e1b4b" />
          <ellipse cx="47" cy="52" rx="11" ry="19" fill="#1e1b4b" />
          <ellipse cx="113" cy="52" rx="11" ry="19" fill="#1e1b4b" />

          {/* Head */}
          <circle cx="80" cy="72" r="36" fill="url(#face)" />

          {/* Eyes */}
          <circle cx="67" cy="68" r="6" fill="#1e1b4b" />
          <circle cx="93" cy="68" r="6" fill="#1e1b4b" />
          <circle cx="69" cy="66" r="2" fill="white" />
          <circle cx="95" cy="66" r="2" fill="white" />

          {/* Smile */}
          <path d="M64 85 Q80 100 96 85" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Body */}
          <rect x="50" y="112" width="60" height="68" rx="22" fill="url(#suit)" />

          {/* Collar */}
          <polygon points="80,112 70,126 80,120 90,126" fill="white" opacity="0.4" />

          {/* Left arm (static, hanging) */}
          <rect x="28" y="115" width="18" height="50" rx="9" fill="url(#suit)" opacity="0.9" />
          <circle cx="37" cy="168" r="11" fill="url(#face)" />

          {/* Right arm — WAVING */}
          <g style={{ transformOrigin: '114px 118px', animation: 'avatarWave 1.5s ease-in-out infinite' }}>
            <rect x="112" y="112" width="18" height="50" rx="9" fill="url(#suit)" opacity="0.9" />
            <circle cx="121" cy="165" r="12" fill="url(#face)" />
            {/* Fingers */}
            <line x1="112" y1="163" x2="107" y2="171" stroke="#c4b0f5" strokeWidth="3" strokeLinecap="round" />
            <line x1="119" y1="167" x2="115" y2="175" stroke="#c4b0f5" strokeWidth="3" strokeLinecap="round" />
            <line x1="125" y1="168" x2="124" y2="176" stroke="#c4b0f5" strokeWidth="3" strokeLinecap="round" />
            <line x1="130" y1="164" x2="133" y2="172" stroke="#c4b0f5" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Legs */}
          <rect x="55" y="175" width="21" height="50" rx="10" fill="url(#suit)" opacity="0.85" />
          <rect x="84" y="175" width="21" height="50" rx="10" fill="url(#suit)" opacity="0.85" />

          {/* Shoes */}
          <ellipse cx="65.5" cy="226" rx="15" ry="8" fill="#1e1b4b" />
          <ellipse cx="94.5" cy="226" rx="15" ry="8" fill="#1e1b4b" />
        </g>
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-base text-muted-foreground font-medium"
      >
        Hey there! <span className="inline-block" style={{ animation: 'avatarWave 1.5s ease-in-out infinite', transformOrigin: '70% 70%' }}>👋</span>
      </motion.p>
    </div>
  );
}

// ─── Social link ──────────────────────────────────────────────────────────────

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-neon-cyan transition-all duration-200"
    >
      <Icon className="w-4.5 h-4.5" size={18} />
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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

          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Bio text */}
            <div className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-semibold">B.Tech (CSE) graduate</span> and
                self-taught MERN Stack Developer from Nepanagar, MP. While balancing college and a
                full-time admin role, I've shipped real, production-grade systems — from HR platforms
                to cloud file managers — that people actually use.
              </p>
              <p>
                My approach is rooted in problem-solving. Whether architecting a React-Redux frontend,
                securing an Express API with JWT RBAC, or managing operations for a school of 1,000+ students,
                I focus on solutions that are scalable and robust in production.
              </p>
              <p>
                Currently freelancing and open to full-time opportunities in full-stack web development.
              </p>

              {/* Social icons */}
              <div className="pt-4 flex items-center gap-3">
                <SocialLink href="mailto:01abhishekwani@gmail.com"          icon={Mail}        label="Email" />
                <SocialLink href="https://linkedin.com/in/abhishekwani0904" icon={FaLinkedin}  label="LinkedIn" />
                <SocialLink href="https://github.com/Abhishek8827"          icon={FaGithub}    label="GitHub" />
                <SocialLink href="https://instagram.com/abhishekwani0904"   icon={FaInstagram} label="Instagram" />
              </div>
            </div>

            {/* Waving avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.15 }}
              className="flex justify-center"
            >
              <WavingAvatar />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
