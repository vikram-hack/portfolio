import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { LAB_ACTIVITIES, PROFILE } from '../data/portfolio';
import { ExternalLink } from 'lucide-react';

export default function Labs() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="labs" className="py-24 relative">
      <div className="absolute inset-0 bg-[#101815]/20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} ls -la labs/ctf/</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">Labs & CTF</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
            <p className="text-[#A1ACA7] mt-3 text-sm max-w-lg">
              Practical cybersecurity experience through hands-on labs, CTF competitions, and real-world simulation environments.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {LAB_ACTIVITIES.map((lab, i) => (
              <motion.div
                key={lab.platform}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass rounded-xl border border-[#26352E] p-5 card-hover flex flex-col"
                style={{ boxShadow: `0 0 20px ${lab.color}10` }}
              >
                {/* Platform header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lab.icon}</span>
                    <h3 className="font-bold text-[#F5F7F6] text-sm">{lab.platform}</h3>
                  </div>
                  {lab.link && (
                    <a
                      href={lab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded border border-[#26352E] text-[#A1ACA7] hover:text-[#00FF9C] hover:border-[#00FF9C30] transition-all"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                {/* Activities */}
                <div className="flex-1">
                  <p className="text-xs font-mono text-[#A1ACA7] mb-2">{'>'} activities</p>
                  <ul className="space-y-1.5">
                    {lab.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2 text-xs text-[#A1ACA7]">
                        <span style={{ color: lab.color }} className="flex-shrink-0 mt-0.5">▸</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status */}
                <div className="mt-4 pt-3 border-t border-[#26352E] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: lab.color }} />
                  <span className="text-xs font-mono text-[#A1ACA7]">Active Practitioner</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TryHackMe callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-xl border border-[#00FF9C30] p-6"
            style={{ boxShadow: '0 0 30px rgba(0,255,156,0.08)' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#F5F7F6] mb-1">TryHackMe Profile</h3>
                <p className="text-sm text-[#A1ACA7]">
                  View my hands-on cybersecurity practice, room completions, and progress on TryHackMe.
                </p>
              </div>
              <a
                href={PROFILE.social.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#00FF9C] text-[#080D0B] font-semibold text-sm rounded hover:bg-[#00e58b] transition-all duration-200 whitespace-nowrap"
                style={{ boxShadow: '0 0 15px rgba(0,255,156,0.3)' }}
              >
                <ExternalLink size={14} />
                View Profile
              </a>
            </div>
          </motion.div>

          {/* Investigation types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              { label: 'Network Security', icon: '📡' },
              { label: 'Linux Hardening', icon: '🐧' },
              { label: 'Digital Forensics', icon: '🔬' },
              { label: 'Vuln Assessment', icon: '🔍' },
            ].map(({ label, icon }) => (
              <div key={label} className="glass rounded-lg border border-[#26352E] p-3 flex items-center gap-2 text-sm text-[#A1ACA7] font-mono">
                <span>{icon}</span> {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

