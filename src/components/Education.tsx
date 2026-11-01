import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { EDUCATION } from '../data/portfolio';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function Education() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="education" className="py-24 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} cat education.md</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">Education</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF9C] via-[#00D9FF] to-transparent hidden sm:block" />

            <div className="space-y-8">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-5 w-12 h-12 rounded-full glass border border-[#00FF9C30] items-center justify-center"
                    style={{ boxShadow: '0 0 15px rgba(0,255,156,0.2)' }}>
                    <GraduationCap size={20} className="text-[#00FF9C]" />
                  </div>

                  <div className="glass rounded-xl border border-[#26352E] p-6 card-hover">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#F5F7F6] mb-1">{edu.degree}</h3>
                        <p className="text-[#00D9FF] font-mono text-sm">{edu.institution}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1ACA7] border border-[#26352E] rounded px-2 py-1">
                          <Calendar size={11} />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border border-[#00FF9C30] text-[#00FF9C] bg-[#00FF9C08]">
                          <Award size={11} />
                          CGPA: {edu.cgpa}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-[#A1ACA7] leading-relaxed mb-4">{edu.description}</p>

                    <div>
                      <p className="text-xs font-mono text-[#A1ACA7] mb-2">{'>'} key_subjects</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((h) => (
                          <span key={h} className="text-xs font-mono px-2 py-0.5 rounded border border-[#26352E] text-[#A1ACA7] bg-[#ffffff05]">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

