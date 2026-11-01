import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { SKILLS } from '../data/portfolio';

const categories = [
  {
    title: 'Offensive Security',
    key: 'offensive' as const,
    color: '#00FF9C',
    border: 'border-[#00FF9C30]',
    glow: '0 0 20px rgba(0,255,156,0.1)',
    label: 'ATTACK',
  },
  {
    title: 'Defensive Security & Forensics',
    key: 'defensive' as const,
    color: '#00D9FF',
    border: 'border-[#00D9FF30]',
    glow: '0 0 20px rgba(0,217,255,0.1)',
    label: 'DEFEND',
  },
  {
    title: 'Tools & Frameworks',
    key: 'tools' as const,
    color: '#FF6B35',
    border: 'border-[#FF6B3530]',
    glow: '0 0 20px rgba(255,107,53,0.1)',
    label: 'TOOLS',
  },
  {
    title: 'Programming',
    key: 'programming' as const,
    color: '#9B59B6',
    border: 'border-[#9B59B630]',
    glow: '0 0 20px rgba(155,89,182,0.1)',
    label: 'CODE',
  },
  {
    title: 'Platforms',
    key: 'platforms' as const,
    color: '#F39C12',
    border: 'border-[#F39C1230]',
    glow: '0 0 20px rgba(243,156,18,0.1)',
    label: 'OS',
  },
];

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" className="py-24 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} skills.json</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">Technical Skills</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(({ title, key, color, border, glow, label }, catIdx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className={`glass rounded-xl border ${border} p-5 card-hover`}
                style={{ boxShadow: glow }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#F5F7F6]">{title}</h3>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded border"
                    style={{ color, borderColor: `${color}40`, background: `${color}10` }}
                  >
                    {label}
                  </span>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {SKILLS[key].map(({ name, icon }) => (
                    <motion.span
                      key={name}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all duration-200"
                      style={{
                        color,
                        borderColor: `${color}25`,
                        background: `${color}08`,
                      }}
                    >
                      <span>{icon}</span>
                      {name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 glass rounded-xl border border-[#26352E] p-5 font-mono text-sm text-center"
          >
            <span className="text-[#00FF9C]">root@vikram:~$ </span>
            <span className="text-[#A1ACA7]">echo "Continuously learning & evolving in the cybersecurity landscape"</span>
            <div className="text-[#F5F7F6] mt-1">Continuously learning & evolving in the cybersecurity landscape</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

