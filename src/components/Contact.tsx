import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { PROFILE } from '../data/portfolio';
import { Mail, Phone, ExternalLink, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email required';
  if (!data.subject.trim() || data.subject.trim().length < 3) errors.subject = 'Subject required';
  if (!data.message.trim() || data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
}

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    // Use mailto as fallback (no API keys needed)
    try {
      const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`[Portfolio Contact] ${form.subject}`)}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitError('Failed to open email client. Please email directly at ' + PROFILE.email);
    } finally {
      setSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      color: '#00FF9C',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: PROFILE.phone,
      href: `tel:${PROFILE.phone}`,
      color: '#00D9FF',
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: `github.com/${PROFILE.githubUsername}`,
      href: PROFILE.social.github,
      color: '#F5F7F6',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/vikram-m',
      href: PROFILE.social.linkedin,
      color: '#0077B5',
    },
    {
      icon: ExternalLink,
      label: 'TryHackMe',
      value: 'tryhackme.com/p/VIKRAM4545',
      href: PROFILE.social.tryhackme,
      color: '#FF6B35',
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-[#101815]/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} contact --open</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">Contact</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
            <p className="text-[#A1ACA7] mt-3 text-sm max-w-lg">
              I'm open to cybersecurity opportunities, collaborations, and research discussions. Let's connect.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <div className="space-y-3 mb-8">
                {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 glass rounded-xl border border-[#26352E] p-4 hover:border-[#00FF9C30] transition-all duration-200 group card-hover"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#26352E] group-hover:border-current transition-colors"
                      style={{ background: `${color}10` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[#A1ACA7]">{label}</p>
                      <p className="text-sm text-[#F5F7F6] group-hover:text-[#00FF9C] transition-colors font-mono">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="glass rounded-xl border border-[#00FF9C30] p-5"
                style={{ boxShadow: '0 0 20px rgba(0,255,156,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
                  <span className="font-mono text-sm text-[#00FF9C] font-bold">Available for Opportunities</span>
                </div>
                <p className="text-xs text-[#A1ACA7]">
                  Open to cybersecurity roles in penetration testing, digital forensics, and security research.
                  Ready for internships, full-time positions, and research collaborations.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="glass rounded-xl border border-[#26352E] p-6">
              <h3 className="font-mono text-sm text-[#00FF9C] mb-5">{'> '} send_message --secure</h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-[#00FF9C] mb-4" />
                  <h4 className="text-[#F5F7F6] font-bold mb-2">Message Sent!</h4>
                  <p className="text-sm text-[#A1ACA7]">Your email client has been opened. Thank you for reaching out!</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 border border-[#00FF9C30] text-[#00FF9C] font-mono text-sm rounded hover:bg-[#00FF9C10] transition-all"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#A1ACA7] mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-[#080D0B] border rounded px-3 py-2.5 text-sm text-[#F5F7F6] font-mono outline-none transition-colors placeholder:text-[#A1ACA7]/40 focus:border-[#00FF9C40] ${errors.name ? 'border-red-500/50' : 'border-[#26352E]'}`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A1ACA7] mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full bg-[#080D0B] border rounded px-3 py-2.5 text-sm text-[#F5F7F6] font-mono outline-none transition-colors placeholder:text-[#A1ACA7]/40 focus:border-[#00FF9C40] ${errors.email ? 'border-red-500/50' : 'border-[#26352E]'}`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A1ACA7] mb-1.5">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Cybersecurity Opportunity"
                      className={`w-full bg-[#080D0B] border rounded px-3 py-2.5 text-sm text-[#F5F7F6] font-mono outline-none transition-colors placeholder:text-[#A1ACA7]/40 focus:border-[#00FF9C40] ${errors.subject ? 'border-red-500/50' : 'border-[#26352E]'}`}
                    />
                    {errors.subject && <p className="text-xs text-red-400 mt-1 font-mono">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A1ACA7] mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message..."
                      className={`w-full bg-[#080D0B] border rounded px-3 py-2.5 text-sm text-[#F5F7F6] font-mono outline-none resize-none transition-colors placeholder:text-[#A1ACA7]/40 focus:border-[#00FF9C40] ${errors.message ? 'border-red-500/50' : 'border-[#26352E]'}`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-2 p-3 rounded border border-red-500/30 bg-red-500/10">
                      <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-400 font-mono">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00FF9C] text-[#080D0B] font-semibold text-sm rounded hover:bg-[#00e58b] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    style={{ boxShadow: '0 0 20px rgba(0,255,156,0.2)' }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#080D0B] border-t-transparent rounded-full animate-spin" />
                        Opening email client...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs font-mono text-[#A1ACA7]/60">
                    Opens your default email client
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
