import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa6';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    const form = e.currentTarget;
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key',
      );
      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-grid-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          {/* Section heading */}
          <div className="mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Say hello</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Get In Touch</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left — info */}
            <div className="lg:col-span-2 space-y-8">
              <p className="text-muted-foreground text-base leading-relaxed">
                Available for freelance projects, full-time roles, or just a technical conversation.
                Feel free to reach out — I usually reply within 24 hours.
              </p>

              <div className="space-y-5">
                <a href="mailto:01abhishekwani@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-neon-cyan transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-0.5">Email</div>
                    <div className="text-sm text-foreground">01abhishekwani@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-secondary uppercase tracking-widest mb-0.5">Phone</div>
                    <div className="text-sm text-foreground">+91 88275 87252</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-0.5">Location</div>
                    <div className="text-sm text-foreground">Nepanagar, MP, India</div>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className="pt-6 border-t border-border flex gap-3">
                <a href="https://github.com/Abhishek8827" target="_blank" rel="noreferrer"
                  aria-label="GitHub"
                  className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-neon-cyan transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/abhishekwani0904" target="_blank" rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/50 hover:shadow-neon-purple transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/abhishekwani0904" target="_blank" rel="noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-pink-400 hover:border-pink-400/50 transition-all"
                  style={{ '--tw-shadow-color': 'rgba(244,114,182,0.3)' } as any}>
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit}
                className="p-7 rounded-2xl bg-card border border-border flex flex-col gap-5 shadow-xl shadow-black/40">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</label>
                    <input type="text" name="user_name" required placeholder="John Doe"
                      className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/40 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                    <input type="email" name="user_email" required placeholder="john@example.com"
                      className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/40 transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
                  <input type="text" name="subject" required placeholder="Project inquiry, job opportunity..."
                    className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground/40 transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                  <textarea name="message" required rows={5} placeholder="Tell me about your project or idea..."
                    className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground resize-none placeholder:text-muted-foreground/40 transition-all" />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-1">
                  {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                </button>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-primary text-sm p-4 bg-primary/10 border border-primary/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-destructive text-sm p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
