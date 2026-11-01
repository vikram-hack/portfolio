import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { PROFILE } from '../data/portfolio';
import { Shield, Search, Code2, Trophy } from 'lucide-react';

const highlights = [
  { icon: Shield, label: 'Penetration Testing', color: '#00FF9C' },
  { icon: Search, label: 'Digital Forensics', color: '#00D9FF' },
  { icon: Code2, label: 'Security Research', color: '#FF6B35' },
  { icon: Trophy, label: 'CTF Competitor', color: '#9B59B6' },
];

export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-[#101815]/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} about_me.txt</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">About Me</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Profile card */}
            <div>
              <div className="glass rounded-xl border border-[#26352E] overflow-hidden mb-6">
                {/* Profile image area */}
                <div className="relative h-64 bg-gradient-to-br from-[#101815] to-[#0a1410] flex items-center justify-center">
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="relative z-10 w-36 h-36 rounded-full border-2 border-[#00FF9C30] overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(0,255,156,0.2)' }}>
                    <img
                      src="/profile.jpg"
                      alt="Vikram M."
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.src = '/profile.svg';
                      }}
                    />
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <span className="text-sm font-mono text-[#A1ACA7] bg-[#080D0B80] px-3 py-1 rounded-full border border-[#26352E]">
                      Cybersecurity Professional
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#F5F7F6] mb-1">{PROFILE.name}</h3>
                  <p className="text-[#00FF9C] font-mono text-sm mb-3">{PROFILE.subtitle}</p>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex items-center gap-3 text-[#A1ACA7]">
                      <span className="text-[#00FF9C] w-16">email</span>
                      <a href={`mailto:${PROFILE.email}`} className="hover:text-[#00FF9C] transition-colors truncate">{PROFILE.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-[#A1ACA7]">
                      <span className="text-[#00FF9C] w-16">phone</span>
                      <a href={`tel:${PROFILE.phone}`} className="hover:text-[#00FF9C] transition-colors">{PROFILE.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 text-[#A1ACA7]">
                      <span className="text-[#00FF9C] w-16">status</span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                        Available for opportunities
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3">
                {highlights.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="glass rounded-lg border border-[#26352E] p-3 flex items-center gap-3 card-hover">
                    <Icon size={18} style={{ color }} />
                    <span className="text-sm text-[#A1ACA7] font-mono">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-5">
              {PROFILE.about.split('\n\n').map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-[#A1ACA7] leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mt-6"
              >
                {[
                  { value: '6+', label: 'Projects' },
                  { value: 'Top 50', label: 'DEFCON CTF' },
                  { value: '4th', label: 'Karunya CTF' },
                ].map(({ value, label }) => (
                  <div key={label} className="glass rounded-lg border border-[#26352E] p-4 text-center">
                    <div className="text-2xl font-bold text-[#00FF9C] mb-1">{value}</div>
                    <div className="text-xs font-mono text-[#A1ACA7]">{label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Terminal snippet */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass rounded-lg border border-[#26352E] p-4 font-mono text-sm"
              >
                <div className="text-[#00FF9C] mb-2">{'> '} current_focus.sh</div>
                <div className="space-y-1 text-[#A1ACA7]">
                  <div><span className="text-[#00D9FF]">studying</span> → M.Sc. Information Security & Digital Forensics</div>
                  <div><span className="text-[#00D9FF]">building</span> → CyberTwin AI & security research tools</div>
                  <div><span className="text-[#00D9FF]">practicing</span> → CTFs on TryHackMe & Hack The Box</div>
                  <div><span className="text-[#00D9FF]">goal</span> → Cybersecurity role in offensive/forensics</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
