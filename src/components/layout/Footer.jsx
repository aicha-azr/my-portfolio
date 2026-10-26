import { ArrowUp } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-line">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.15em] text-mute">
      <p>© {new Date().getFullYear()} Aicha Azeroual</p>
      <p>Designed &amp; built with React + Tailwind</p>
      <a href="#home" className="inline-flex items-center gap-2 text-paper hover:text-acid transition-colors">
        Back to top <ArrowUp size={14} />
      </a>
    </div>
  </footer>
);

export default Footer;
