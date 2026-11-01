import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { PROFILE } from '../data/portfolio';
import { Star, GitFork, ExternalLink, Clock, Code2 } from 'lucide-react';
import { GithubIcon } from './icons';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3776AB',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Shell: '#89E051',
  Bash: '#89E051',
  C: '#A8B9CC',
  'C++': '#00599C',
  Java: '#B07219',
  HTML: '#E34C26',
  CSS: '#663399',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function GitHub() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView(0.1);

  useEffect(() => {
    fetch(`https://api.github.com/users/${PROFILE.githubUsername}/repos?sort=updated&per_page=9`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`);
        return r.json();
      })
      .then((data: Repo[]) => {
        setRepos(data.filter(r => !r.name.startsWith('.')));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="github" className="py-24 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-12">
            <p className="font-mono text-[#00FF9C] text-sm mb-2">{'> '} gh repo list {PROFILE.githubUsername}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7F6] mb-3">GitHub Activity</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#00FF9C] to-transparent" />
            <div className="flex items-center gap-4 mt-4">
              <a
                href={PROFILE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-mono text-[#A1ACA7] hover:text-[#00FF9C] transition-colors"
              >
                <GithubIcon size={14} />
                github.com/{PROFILE.githubUsername}
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-xl border border-[#26352E] p-5 animate-pulse">
                  <div className="h-4 bg-[#26352E] rounded mb-3 w-2/3" />
                  <div className="h-3 bg-[#26352E] rounded mb-2 w-full" />
                  <div className="h-3 bg-[#26352E] rounded w-4/5" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="glass rounded-xl border border-[#FF6B3530] p-6 text-center">
              <Code2 size={32} className="mx-auto mb-3 text-[#FF6B35]" />
              <p className="text-[#A1ACA7] text-sm mb-4">Unable to load GitHub repositories. {error}</p>
              <a
                href={PROFILE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#00FF9C30] text-[#00FF9C] font-mono text-sm rounded hover:bg-[#00FF9C10] transition-all"
              >
                <GithubIcon size={14} /> View on GitHub
              </a>
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <div className="glass rounded-xl border border-[#26352E] p-8 text-center">
              <GithubIcon size={32} className="mx-auto mb-3 text-[#A1ACA7]" />
              <p className="text-[#A1ACA7] text-sm">No public repositories found.</p>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    whileHover={{ y: -4, borderColor: 'rgba(0,255,156,0.3)' }}
                    className="glass rounded-xl border border-[#26352E] p-4 flex flex-col gap-3 group transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <GithubIcon size={14} className="text-[#A1ACA7] flex-shrink-0" />
                        <span className="text-sm font-mono text-[#00FF9C] group-hover:text-[#00e58b] truncate transition-colors">
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink size={12} className="text-[#A1ACA7] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-xs text-[#A1ACA7] leading-relaxed flex-1 line-clamp-2">
                      {repo.description || 'No description provided.'}
                    </p>

                    <div className="flex items-center justify-between text-xs font-mono text-[#A1ACA7]">
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: LANG_COLORS[repo.language] || '#A1ACA7' }}
                            />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={10} /> {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork size={10} /> {repo.forks_count}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-[#A1ACA7]/60">
                        <Clock size={9} /> {timeAgo(repo.updated_at)}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="text-center">
                <a
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#00FF9C30] text-[#00FF9C] font-mono text-sm rounded hover:bg-[#00FF9C10] transition-all duration-200"
                >
                  <GithubIcon size={14} />
                  View all repositories
                  <ExternalLink size={12} />
                </a>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

