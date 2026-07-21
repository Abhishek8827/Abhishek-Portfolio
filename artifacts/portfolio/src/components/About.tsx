import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

// ─── Animated hooded-boy avatar ───────────────────────────────────────────────

type AvatarState = 'wave' | 'type' | 'coffee' | 'idle';

const STATES: AvatarState[]  = ['wave', 'type', 'coffee', 'idle'];
const DURATION = 3500; // ms per state

const STATE_LABELS: Record<AvatarState, string> = {
  wave:   'Hey there! 👋',
  type:   'Building... 💻',
  coffee: 'Coffee time ☕',
  idle:   'Chilling 😌',
};

// Right-arm rotation per state (degrees, pivot = shoulder, SVG CW = positive)
const RIGHT_ARM: Record<AvatarState, number> = {
  idle:   12,
  wave:  -110,   // arm raised upward
  type:   55,    // arm reaching forward/down
  coffee: -72,   // arm at mouth level
};
// Left-arm rotation
const LEFT_ARM: Record<AvatarState, number> = {
  idle:  -12,
  wave:  -12,
  type:  -55,
  coffee: -12,
};
// Head tilt
const HEAD_TILT: Record<AvatarState, number> = {
  idle:    0,
  wave:    8,
  type:  -14,
  coffee: 12,
};

function HoodedBoyAvatar({ state }: { state: AvatarState }) {
  const spring = { type: 'spring' as const, stiffness: 90, damping: 13 };

  return (
    <svg viewBox="0 0 200 310" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="bg-aura" cx="50%" cy="55%" r="50%">
          <stop offset="0%"   stopColor="#00f5ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skin-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffe0c8" />
          <stop offset="100%" stopColor="#f5c7a9" />
        </linearGradient>
        <linearGradient id="hoodie-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="hoodie-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="hair-g" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%"   stopColor="#2d3142" />
          <stop offset="100%" stopColor="#1a1f30" />
        </linearGradient>
      </defs>

      {/* Aura glow */}
      <circle cx="100" cy="160" r="100" fill="url(#bg-aura)" />

      {/* Full body wrapper — gentle bob */}
      <g style={{ animation: 'avatarBob 3.5s ease-in-out infinite', transformOrigin: '100px 200px' }}>

        {/* ── HOOD (behind head) ── */}
        <ellipse cx="100" cy="95" rx="58" ry="60" fill="url(#hoodie-g)" />
        <ellipse cx="100" cy="58" rx="48" ry="26" fill="url(#hoodie-g)" />
        {/* Hood shadow inner */}
        <ellipse cx="100" cy="100" rx="44" ry="48" fill="url(#hoodie-dark)" opacity="0.18" />

        {/* ── HAIR ── */}
        {/* Main hair mass */}
        <ellipse cx="100" cy="68" rx="43" ry="30" fill="url(#hair-g)" />
        {/* Side locks */}
        <ellipse cx="60"  cy="82" rx="14" ry="22" fill="url(#hair-g)" />
        <ellipse cx="140" cy="82" rx="14" ry="22" fill="url(#hair-g)" />
        {/* Fringe / bang sweeping right */}
        <path d="M62 72 Q85 58 115 65 Q105 78 80 75 Z" fill="#1a1f30" opacity="0.9" />

        {/* ── HEAD ── */}
        <motion.g
          animate={{ rotate: HEAD_TILT[state] }}
          style={{ transformOrigin: '100px 105px' }}
          transition={spring}
        >
          <circle cx="100" cy="105" r="40" fill="url(#skin-g)" />

          {/* Cheek blush */}
          <circle cx="75"  cy="115" r="9" fill="#f9a8a8" opacity="0.35" />
          <circle cx="125" cy="115" r="9" fill="#f9a8a8" opacity="0.35" />

          {/* ── EYES ── */}
          {/* Left eye */}
          <circle cx="83" cy="101" r="9" fill="white" />
          <circle cx="83" cy="102" r="6" fill="#1a1f30" />
          <circle cx="83" cy="102" r="3" fill="#0d0d1a" />
          <circle cx="85.5" cy="99.5" r="2" fill="white" opacity="0.9" />
          {/* Right eye */}
          <circle cx="117" cy="101" r="9" fill="white" />
          <circle cx="117" cy="102" r="6" fill="#1a1f30" />
          <circle cx="117" cy="102" r="3" fill="#0d0d1a" />
          <circle cx="119.5" cy="99.5" r="2" fill="white" opacity="0.9" />

          {/* Eyebrows */}
          <path d="M75 91 Q83 87 91 90" stroke="#2d3142" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M109 90 Q117 87 125 91" stroke="#2d3142" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <ellipse cx="100" cy="113" rx="3.5" ry="2.5" fill="#e8b49a" opacity="0.7" />

          {/* Mouth */}
          {state === 'coffee' || state === 'idle' ? (
            <path d="M89 121 Q100 130 111 121" stroke="#c07060" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M90 120 Q100 128 110 120" stroke="#c07060" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}

          {/* Earphone strings */}
          <line x1="60" y1="105" x2="64" y2="130" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="140" y1="105" x2="136" y2="130" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
          {/* Earbuds */}
          <circle cx="60" cy="105" r="3" fill="#94a3b8" />
          <circle cx="140" cy="105" r="3" fill="#94a3b8" />
        </motion.g>

        {/* ── BODY / HOODIE ── */}
        <rect x="60" y="142" width="80" height="88" rx="24" fill="url(#hoodie-g)" />
        {/* Zipper line */}
        <line x1="100" y1="146" x2="100" y2="228" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
        {/* Pocket */}
        <rect x="76" y="188" width="48" height="26" rx="10" fill="url(#hoodie-dark)" opacity="0.25" />
        {/* Hood strings */}
        <line x1="90"  y1="150" x2="82"  y2="175" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="110" y1="150" x2="118" y2="175" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* ── LEFT ARM ── */}
        <motion.g
          animate={{ rotate: LEFT_ARM[state] }}
          style={{ transformOrigin: '0px 0px' }}
          transition={spring}
        >
          <g transform="translate(62,148)">
            <rect x="-10" y="0" width="20" height="56" rx="10" fill="url(#hoodie-g)" />
            {/* Left hand */}
            <circle cx="0" cy="60" r="11" fill="url(#skin-g)" />
            {state === 'type' && (
              <>
                <line x1="-8"  y1="66" x2="-12" y2="74" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="-2"  y1="69" x2="-4"  y2="77" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="5"   y1="69" x2="5"   y2="77" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </g>
        </motion.g>

        {/* ── RIGHT ARM ── */}
        <motion.g
          animate={{ rotate: RIGHT_ARM[state] }}
          style={{ transformOrigin: '0px 0px' }}
          transition={spring}
        >
          <g transform="translate(138,148)">
            <rect x="-10" y="0" width="20" height="56" rx="10" fill="url(#hoodie-g)" />
            {/* Right hand */}
            <circle cx="0" cy="60" r="11" fill="url(#skin-g)" />
            {/* Fingers — wave state */}
            {state === 'wave' && (
              <>
                <line x1="-8"  y1="54" x2="-14" y2="45" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="-3"  y1="51" x2="-6"  y2="41" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="3"   y1="51" x2="3"   y2="40" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="9"   y1="53" x2="13"  y2="43" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
            {/* Coffee mug */}
            {state === 'coffee' && (
              <g transform="translate(6, 48)">
                <rect x="-12" y="-26" width="24" height="20" rx="5" fill="#f97316" />
                <rect x="-10" y="-24" width="20" height="16" rx="3" fill="#fdba74" opacity="0.6" />
                {/* Handle */}
                <path d="M12 -22 Q20 -18 12 -10" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Steam */}
                <path d="M-4 -30 Q-2 -36 -4 -42" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
                <path d="M2 -32 Q4 -38 2 -44"  stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              </g>
            )}
            {/* Typing fingers */}
            {state === 'type' && (
              <>
                <line x1="-8"  y1="66" x2="-12" y2="74" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="-2"  y1="69" x2="-4"  y2="77" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
                <line x1="5"   y1="69" x2="5"   y2="77" stroke="#f5c7a9" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </g>
        </motion.g>

        {/* ── LEGS ── */}
        <rect x="64" y="226" width="28" height="56" rx="14" fill="url(#hoodie-dark)" />
        <rect x="108" y="226" width="28" height="56" rx="14" fill="url(#hoodie-dark)" />
        {/* Shoes */}
        <ellipse cx="78"  cy="284" rx="18" ry="9" fill="#1e293b" />
        <ellipse cx="122" cy="284" rx="18" ry="9" fill="#1e293b" />

        {/* ── LAPTOP (type state) ── */}
        {state === 'type' && (
          <g>
            {/* Keyboard base */}
            <rect x="52" y="244" width="96" height="14" rx="5" fill="#334155" />
            {/* Screen */}
            <rect x="58" y="208" width="84" height="40" rx="6" fill="#0f172a" />
            <rect x="62" y="212" width="76" height="32" rx="4" fill="#1e293b" />
            {/* Code lines on screen */}
            <rect x="66" y="216" width="36" height="3" rx="1.5" fill="#00f5ff" opacity="0.7" />
            <rect x="66" y="222" width="52" height="3" rx="1.5" fill="#a78bfa" opacity="0.6" />
            <rect x="66" y="228" width="30" height="3" rx="1.5" fill="#4ade80" opacity="0.7" />
            <rect x="66" y="234" width="44" height="3" rx="1.5" fill="#00f5ff" opacity="0.5" />
          </g>
        )}
      </g>
    </svg>
  );
}

function AnimatedAvatar() {
  const [stateIdx, setStateIdx] = useState(0);
  const current = STATES[stateIdx];

  useEffect(() => {
    const id = setTimeout(() => setStateIdx((i) => (i + 1) % STATES.length), DURATION);
    return () => clearTimeout(id);
  }, [stateIdx]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-52 h-72 relative">
        <HoodedBoyAvatar state={current} />
      </div>
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm text-muted-foreground font-medium px-3 py-1 rounded-full bg-card border border-border"
      >
        {STATE_LABELS[current]}
      </motion.div>
    </div>
  );
}

// ─── Social icon ──────────────────────────────────────────────────────────────

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-neon-cyan transition-all duration-200">
      <Icon size={18} />
    </a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

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
          <div className="mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Who I am</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-center">
            {/* Bio */}
            <div className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-semibold">B.Tech (CSE) graduate</span> and
                self-taught MERN Stack Developer from Nepanagar, MP. While balancing college and a
                full-time admin role, I've shipped production-grade systems — from HR platforms to cloud
                file managers — that people actually use.
              </p>
              <p>
                My approach is rooted in problem-solving. Whether architecting a React-Redux frontend,
                securing an Express API with JWT RBAC, or managing operations for a school of 1,000+
                students, I focus on scalable solutions that hold up in production.
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

            {/* About section video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.15 }}
              className="hidden md:flex justify-center"
            >
              <video
                className="w-full max-w-xs aspect-[9/16] rounded-3xl overflow-hidden border border-border shadow-neon-cyan object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="about-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
