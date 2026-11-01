import { ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { PROFILE } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#26352E] bg-[#101815]/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <div className="font-mono text-lg font-bold mb-1">
              <span className="text-[#00FF9C]">VIKRAM</span>
              <span className="text-[#A1ACA7]">.</span>
              <span className="text-[#00D9FF]">DEV</span>
            </div>
            <p className="text-xs text-[#A1ACA7] font-mono">Cybersecurity Professional</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {[
              { icon: GithubIcon, href: PROFILE.social.github, label: 'GitHub' },
              { icon: LinkedinIcon, href: PROFILE.social.linkedin, label: 'LinkedIn' },
              { icon: ExternalLink, href: PROFILE.social.tryhackme, label: 'TryHackMe' },
              { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-9 h-9 rounded-lg glass border border-[#26352E] flex items-center justify-center text-[#A1ACA7] hover:text-[#00FF9C] hover:border-[#00FF9C30] transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs font-mono text-[#A1ACA7]/60">
            © {year} Vikram M. All rights reserved.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-5 border-t border-[#26352E] text-center">
          <p className="text-xs font-mono text-[#A1ACA7]/40">
            <span className="text-[#00FF9C]/60">root@vikram:~$ </span>
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
