import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
      );
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16 flex-row-reverse">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary" style={{ fontFamily: 'var(--app-font-display)' }}>
              INIT_CONNECTION //
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-secondary/50 to-transparent"></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Available for freelance opportunities, full-time roles, or just a technical discussion. System is standing by for your query.
              </p>

              <div className="space-y-6">
                <a href="mailto:01abhishekwani@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center group-hover:border-primary group-hover:shadow-neon-cyan transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">EMAIL_PROTOCOL</div>
                    <div className="text-foreground">01abhishekwani@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-secondary mb-1 uppercase tracking-widest">COMMLINK</div>
                    <div className="text-foreground">+91 88275 87252</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">LOCATION</div>
                    <div className="text-foreground">Nepanagar, MP, India</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border flex gap-4">
                <a href="https://github.com/Abhishek8827" target="_blank" rel="noreferrer" className="w-12 h-12 rounded bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-neon-cyan transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/abhishekwani0904" target="_blank" rel="noreferrer" className="w-12 h-12 rounded bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary hover:shadow-neon-purple transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-card border border-border flex flex-col gap-6 shadow-xl shadow-black/50">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-widest">Name</label>
                    <input 
                      type="text" 
                      name="user_name"
                      required
                      className="w-full bg-background/50 border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all placeholder:text-muted-foreground/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-widest">Email</label>
                    <input 
                      type="email" 
                      name="user_email"
                      required
                      className="w-full bg-background/50 border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all placeholder:text-muted-foreground/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    className="w-full bg-background/50 border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all placeholder:text-muted-foreground/50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase tracking-widest">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-background/50 border border-border rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all resize-none placeholder:text-muted-foreground/50"
                    placeholder="Transmit your message here..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-neon-cyan py-4 rounded font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? 'TRANSMITTING...' : <><Send className="w-4 h-4" /> SEND TRANSMISSION</>}
                </button>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-primary p-4 bg-primary/10 border border-primary/20 rounded">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-mono text-sm">Transmission successful. System standing by.</span>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-mono text-sm">Transmission failed. Please check your connection and try again.</span>
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