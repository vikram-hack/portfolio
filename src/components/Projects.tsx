import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { PROJECTS } from '../data/portfolio';
import { ExternalLink, Tag } from 'lucide-react';
import { GithubIcon } from './icons';

export default function Projects() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-[#101815]/20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} ls projects/</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">Featured Projects</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
            <p className="text-[#A1ACA7] mt-3 text-sm max-w-lg">
              A collection of security tools, research projects, and AI-powered systems built to solve real-world cybersecurity challenges.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: `0 0 30px ${project.color}18` }}
      className="glass rounded-xl border border-[#26352E] overflow-hidden flex flex-col group"
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Card header */}
      <div className="p-5 border-b border-[#26352E]" style={{ background: `linear-gradient(135deg, ${project.color}08, transparent)` }}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{project.icon}</span>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30` }}
            >
              {project.category}
            </span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded border border-[#26352E] text-[#A1ACA7]"
            >
              {project.status}
            </span>
          </div>
        </div>
        <h3 className="text-base font-bold text-[#F5F7F6] mb-1 group-hover:text-[#00FF9C] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-[#A1ACA7]">{project.subtitle}</p>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-[#A1ACA7] leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Key features */}
        <div className="mb-4">
          <p className="text-xs font-mono text-[#A1ACA7] mb-2">{'>'} key_features</p>
          <ul className="space-y-1">
            {project.features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#A1ACA7]">
                <span style={{ color: project.color }} className="flex-shrink-0 mt-0.5">▸</span>
                {feat}
              </li>
            ))}
            {project.features.length > 3 && (
              <li className="text-xs font-mono" style={{ color: project.color }}>
                +{project.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="flex items-center gap-1 text-xs font-mono text-[#A1ACA7] px-2 py-0.5 rounded bg-[#ffffff08] border border-[#26352E]">
              <Tag size={9} />{tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-mono text-[#A1ACA7] px-2 py-0.5">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#26352E]">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#A1ACA7] hover:text-[#00FF9C] transition-colors"
            >
              <GithubIcon size={13} /> Repository
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#A1ACA7]/50">
              <GithubIcon size={13} /> Private
            </span>
          )}
          {project.demo && (
            <>
              <span className="text-[#26352E]">|</span>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#A1ACA7] hover:text-[#00D9FF] transition-colors"
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

