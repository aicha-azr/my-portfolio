import { useEffect, useState } from 'react';

const script = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'aicha azeroual — full-stack developer' },
  { type: 'cmd', text: 'cat stack.txt' },
  { type: 'out', text: 'react · next.js · node · postgres · mongodb · redis' },
  { type: 'cmd', text: 'ls ~/integrations' },
  { type: 'out', text: 'whatsapp-cloud-api  botpress  slack' },
  { type: 'out', text: 'google-drive  google-calendar  tiktok' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Terminal = () => {
  // Position in the script: which line, and how many characters of it are typed
  const [line, setLine] = useState(() => (prefersReducedMotion() ? script.length : 0));
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (line >= script.length) return undefined;

    const current = script[line];
    // Commands are typed character by character, output appears line by line
    if (current.type === 'cmd' && chars < current.text.length) {
      const id = setTimeout(() => setChars((c) => c + 1), 55 + Math.random() * 60);
      return () => clearTimeout(id);
    }

    const pause = current.type === 'cmd' ? 350 : 140;
    const id = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, pause);
    return () => clearTimeout(id);
  }, [line, chars]);

  return (
    <div className="w-full rounded-2xl border border-line bg-coal/90 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-acid" />
        <span className="ml-3 font-mono text-[11px] text-mute">~/aicha — zsh</span>
      </div>

      <pre className="min-h-[15rem] whitespace-pre-wrap break-words px-5 py-5 font-mono text-[13px] leading-7 text-paper/90">
        {script.slice(0, line).map((entry, i) => (
          <div key={i} className={entry.type === 'out' ? 'text-mute' : ''}>
            {entry.type === 'cmd' && <span className="text-acid">❯ </span>}
            {entry.text}
          </div>
        ))}
        {(line >= script.length || script[line].type === 'cmd') && (
          <div>
            <span className="text-acid">❯ </span>
            {line < script.length && script[line].text.slice(0, chars)}
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-acid animate-blink" />
          </div>
        )}
      </pre>
    </div>
  );
};

export default Terminal;
