import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ACHIEVEMENTS } from '../data/portfolio';

export default function Achievements() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="achievements" className="py-24 relative">
      <div className="absolute inset-0 bg-[#101815]/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} cat achievements.log</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">Achievements</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACHIEVEMENTS.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: `0 0 25px ${achievement.color}15` }}
                className="glass rounded-xl border border-[#26352E] p-5 flex flex-col gap-4 card-hover"
              >
                {/* Icon & rank */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{achievement.icon}</span>
                  <span
                    className="text-sm font-bold font-mono px-3 py-1 rounded-full"
                    style={{ color: achievement.color, background: `${achievement.color}15`, border: `1px solid ${achievement.color}30` }}
                  >
                    {achievement.rank}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-bold text-[#F5F7F6] mb-1">{achievement.title}</h3>
                  <p className="text-xs font-mono mb-2" style={{ color: achievement.color }}>
                    {achievement.organization}
                  </p>
                  <p className="text-xs text-[#A1ACA7] leading-relaxed">{achievement.description}</p>
                </div>

                {/* Type badge */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#26352E]">
                  <span className="text-xs font-mono px-2 py-0.5 rounded border border-[#26352E] text-[#A1ACA7]">
                    {achievement.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center font-mono text-xs text-[#A1ACA7]"
          >
            <span className="text-[#00FF9C]"># </span>
            Only verified achievements are displayed.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

