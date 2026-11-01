import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { PROFILE } from '../data/portfolio';

const TERMINAL_LINES = [
  { prompt: 'root@vikram:~$', cmd: 'whoami', delay: 500 },
  { output: 'Vikram M. — Cybersecurity Professional', delay: 1000 },
  { spacer: true, delay: 1400 },
  { prompt: 'root@vikram:~$', cmd: 'cat interests.txt', delay: 1600 },
  { output: 'Penetration Testing', delay: 2000 },
  { output: 'Network Security', delay: 2300 },
  { output: 'Digital Forensics', delay: 2600 },
  { output: 'Malware Analysis', delay: 2900 },
  { output: 'Security Research', delay: 3200 },
  { spacer: true, delay: 3600 },
  { prompt: 'root@vikram:~$', cmd: 'status', delay: 3800 },
  { output: '✓ Available for Cybersecurity Opportunities', delay: 4200, success: true },
];

type TerminalLine = {
  prompt?: string;
  cmd?: string;
  output?: string;
  spacer?: boolean;
  delay?: number;
  success?: boolean;
};

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        terminalRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
      }, line.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(0,255,156,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="font-mono text-sm text-[#00FF9C] border border-[#00FF9C30] rounded px-3 py-1 bg-[#00FF9C08]">
                {'> '} Cybersecurity Professional
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              <span className="text-[#F5F7F6]">Vikram</span>{' '}
              <span className="text-[#00FF9C]" style={{ textShadow: '0 0 30px rgba(0,255,156,0.3)' }}>M.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[#00D9FF] font-mono mb-6 leading-relaxed"
            >
              {PROFILE.headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#A1ACA7] text-sm sm:text-base mb-8 leading-relaxed max-w-lg"
            >
              {PROFILE.intro}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 bg-[#00FF9C] text-[#080D0B] font-semibold rounded text-sm hover:bg-[#00e58b] transition-all duration-200 flex items-center gap-2"
                style={{ boxShadow: '0 0 20px rgba(0,255,156,0.3)' }}
              >
                <ExternalLink size={15} />
                View Projects
              </button>
              <a
                href="/resume.pdf"
                download
                className="px-5 py-2.5 border border-[#00FF9C40] text-[#00FF9C] font-mono text-sm rounded hover:bg-[#00FF9C10] transition-all duration-200 flex items-center gap-2"
              >
                <Download size={15} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <a href={PROFILE.social.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A1ACA7] hover:text-[#00FF9C] transition-colors text-sm font-mono">
              <GithubIcon size={16} /> GitHub
              </a>
              <span className="text-[#26352E]">|</span>
              <a href={PROFILE.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A1ACA7] hover:text-[#00D9FF] transition-colors text-sm font-mono">
              <LinkedinIcon size={16} /> LinkedIn
              </a>
              <span className="text-[#26352E]">|</span>
              <a href={PROFILE.social.tryhackme} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A1ACA7] hover:text-[#FF6B35] transition-colors text-sm font-mono">
                <ExternalLink size={14} /> TryHackMe
              </a>
            </motion.div>
          </div>

          {/* Right — Profile + Terminal */}
          <div className="flex flex-col items-center gap-6">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(0,255,156,0.2) 0%, transparent 70%)', transform: 'scale(1.3)' }}
              />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-[#00FF9C30] overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(0,255,156,0.2), 0 0 80px rgba(0,255,156,0.05)' }}>
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
              {/* Status badge */}
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 bg-[#101815] border border-[#00FF9C30] rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                <span className="text-xs font-mono text-[#00FF9C]">Available</span>
              </div>
            </motion.div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-md glass rounded-lg overflow-hidden border border-[#26352E]"
              style={{ boxShadow: '0 0 30px rgba(0,255,156,0.08)' }}
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#101815] border-b border-[#26352E]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-[#00FF9C]/70" />
                <span className="ml-2 text-xs font-mono text-[#A1ACA7]">vikram@kali — bash</span>
              </div>
              <div ref={terminalRef} className="p-4 font-mono text-sm h-52 overflow-y-auto bg-[#080D0B]">
                {visibleLines.map((line, i) => (
                  <div key={i}>
                    {line.spacer && <div className="h-2" />}
                    {line.prompt && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#00FF9C]">{line.prompt}</span>
                        <span className="text-[#F5F7F6]">{line.cmd}</span>
                      </div>
                    )}
                    {line.output && (
                      <div className={`ml-0 ${line.success ? 'text-[#00FF9C]' : 'text-[#A1ACA7]'}`}>
                        {line.output}
                      </div>
                    )}
                  </div>
                ))}
                {visibleLines.length < TERMINAL_LINES.length && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#00FF9C]">root@vikram:~$</span>
                    <span className="terminal-cursor" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#A1ACA7]"
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
