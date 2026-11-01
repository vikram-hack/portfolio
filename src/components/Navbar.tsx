import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Labs & CTF', href: '#labs' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-[#26352E]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-2 font-mono text-lg font-bold"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-[#00FF9C]">VIKRAM</span>
              <span className="text-[#A1ACA7]">.</span>
              <span className="text-[#00D9FF]">DEV</span>
              <span className="terminal-cursor ml-1" />
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`px-3 py-1.5 text-sm font-mono transition-all duration-200 rounded
                    ${active === href.slice(1)
                      ? 'text-[#00FF9C] bg-[#00FF9C10] border border-[#00FF9C30]'
                      : 'text-[#A1ACA7] hover:text-[#F5F7F6] hover:bg-[#ffffff08]'
                    }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => setTerminalOpen(true)}
                className="ml-2 px-3 py-1.5 text-sm font-mono text-[#00FF9C] border border-[#00FF9C30] rounded hover:bg-[#00FF9C10] transition-all flex items-center gap-1.5"
              >
                <Terminal size={13} />
                Terminal
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-[#A1ACA7] hover:text-[#00FF9C]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-[#26352E]"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {navItems.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={`px-3 py-2 text-sm font-mono text-left rounded transition-all
                      ${active === href.slice(1)
                        ? 'text-[#00FF9C] bg-[#00FF9C10]'
                        : 'text-[#A1ACA7] hover:text-[#F5F7F6]'
                      }`}
                  >
                    <span className="text-[#00FF9C]">$</span> {label.toLowerCase()}
                  </button>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); setTerminalOpen(true); }}
                  className="px-3 py-2 text-sm font-mono text-[#00FF9C] flex items-center gap-2"
                >
                  <Terminal size={13} /> open terminal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Terminal Modal */}
      {terminalOpen && (
        <TerminalModal onClose={() => setTerminalOpen(false)} />
      )}
    </>
  );
}

function TerminalModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ cmd: string; output: string[] }[]>([
    { cmd: '', output: ['Welcome to Vikram\'s Terminal. Type "help" for commands.', ''] }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, string[]> = {
    help: [
      '╔══════════════════════════════════╗',
      '║     Available Commands           ║',
      '╚══════════════════════════════════╝',
      '  whoami       — Who is Vikram M.',
      '  about        — About & background',
      '  skills       — Technical skill set',
      '  projects     — Featured projects',
      '  achievements — CTF & competitions',
      '  education    — Academic background',
      '  github       — GitHub profile',
      '  linkedin     — LinkedIn profile',
      '  tryhackme    — TryHackMe profile',
      '  contact      — Contact details',
      '  clear         — Clear terminal',
      '',
    ],
    whoami: [
      '╔══════════════════════════════════╗',
      '║         Vikram M.                ║',
      '╚══════════════════════════════════╝',
      '  Role    : Cybersecurity Professional',
      '  Focus   : Penetration Testing | Digital Forensics',
      '  Status  : Available for Cybersecurity Opportunities',
      '  Location: India',
      '',
    ],
    about: [
      '> M.Sc. Information Security & Digital Forensics',
      '  Karunya Institute of Technology and Science',
      '',
      '> Passionate about: Penetration Testing, Network Security,',
      '  Digital Forensics, Malware Analysis, Security Research',
      '',
      '> Hands-on practice via CTFs, open-source tools & labs',
      '',
    ],
    skills: [
      '[ Offensive Security ]',
      '  ✓ Penetration Testing',
      '  ✓ Network Scanning & Enumeration',
      '  ✓ Web Application Security (OWASP)',
      '  ✓ Privilege Escalation',
      '',
      '[ Defensive Security ]',
      '  ✓ SIEM Management | Log Analysis',
      '  ✓ Malware Analysis | Digital Forensics',
      '  ✓ Incident Response',
      '',
      '[ Tools ]  Nmap | Metasploit | Burp Suite | Wireshark | Gobuster',
      '[ Code ]   Python | Bash',
      '',
    ],
    projects: [
      '1. CyberTwin AI              — AI Digital Twin for Attack Simulation',
      '2. CNN-LSTM Attack Attribution — Deep Learning Research (2024-25)',
      '3. Web Vulnerability Scanner — Python automated scanner',
      '4. Network Scanning Tool     — Custom recon tool',
      '5. AI-Based Fraud Detection  — AIML fraud classifier',
      '6. SecureGuard               — Suspicious network activity detection',
      '',
    ],
    achievements: [
      '🏆 4th Place  — International CTF, Karunya Institute',
      '🥇 Top 50     — DEFCON CTF',
      '🎯 Participant — PicoCTF',
      '📦 Active     — Hack The Box',
      '🚀 Active     — TryHackMe',
      '',
    ],
    education: [
      '📚 M.Sc. Information Security & Digital Forensics',
      '   Karunya Institute of Technology and Science | 2025–2027',
      '   CGPA: 8.9 / 10',
      '',
      '📚 B.Sc. Computer Science with Cyber Security',
      '   Rathinam College of Arts and Science | 2022–2025',
      '   CGPA: 7.5 / 10',
      '',
    ],
    github: [
      '🔗 GitHub: https://github.com/vikram-hack',
      '',
      '  Repositories: Advanced-Web-Vulnerability-Scanner',
      '                Network-scanning-Tool',
      '                Advance-Fraud-Detection-Using-AIML-',
      '',
    ],
    linkedin: [
      '🔗 LinkedIn: https://www.linkedin.com/in/vikram-m-75ba232a5',
      '',
    ],
    tryhackme: [
      '🔗 TryHackMe: https://tryhackme.com/p/VIKRAM4545',
      '',
    ],
    contact: [
      '📧 Email : vikram63855@gmail.com',
      '📞 Phone : +91 6385567785',
      '🔗 GitHub: https://github.com/vikram-hack',
      '🔗 LinkedIn: https://www.linkedin.com/in/vikram-m-75ba232a5',
      '',
    ],
  };

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory(prev => [trimmed, ...prev]);
    setHistIdx(-1);

    if (trimmed === 'clear') {
      setHistory([{ cmd: '', output: ['Terminal cleared. Type "help" for commands.', ''] }]);
      return;
    }

    const output = commands[trimmed] || [`Command not found: ${trimmed}`, 'Type "help" for available commands.', ''];
    setHistory(prev => [...prev, { cmd: trimmed, output }]);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl glass rounded-lg border border-[#00FF9C30] overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(0,255,156,0.15)' }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#101815] border-b border-[#26352E]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs font-mono text-[#A1ACA7]">vikram@terminal — bash</span>
          </div>
          <button onClick={onClose} className="text-[#A1ACA7] hover:text-[#00FF9C]">
            <X size={14} />
          </button>
        </div>

        {/* Output */}
        <div className="h-96 overflow-y-auto p-4 font-mono text-sm bg-[#080D0B]">
          {history.map((entry, i) => (
            <div key={i}>
              {entry.cmd && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#00FF9C]">root@vikram:~$</span>
                  <span className="text-[#F5F7F6]">{entry.cmd}</span>
                </div>
              )}
              {entry.output.map((line, j) => (
                <div key={j} className="text-[#A1ACA7] leading-relaxed whitespace-pre">{line}</div>
              ))}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#080D0B] border-t border-[#26352E]">
          <span className="text-[#00FF9C] font-mono text-sm flex-shrink-0">root@vikram:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#F5F7F6] font-mono text-sm outline-none caret-[#00FF9C]"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

