import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

// Serves the CV chosen in /admin, or the one in public/ if none was uploaded
const CV_URL = '/api/cv';

const links = [
  { href: '#work', index: '01', label: 'Work' },
  { href: '#about', index: '02', label: 'About' },
  { href: '#contact', index: '03', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled || isOpen ? 'bg-night/80 backdrop-blur-md border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-display italic text-2xl text-paper">
          Aicha<span className="not-italic text-acid">*</span>
        </a>

        <ul className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-[0.15em]">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="group text-mute hover:text-paper transition-colors">
                <span className="text-acid/70 group-hover:text-acid">{link.index}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CV_URL}
          download="Aicha_Azeroual_CV.pdf"
          className="hidden md:inline-flex font-mono text-xs uppercase tracking-[0.15em] border border-paper/30 text-paper px-4 py-2 rounded-full hover:bg-acid hover:text-night hover:border-acid transition-colors"
        >
          Download CV
        </a>

        <button
          type="button"
          className="md:hidden text-paper"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-8 pt-2 flex flex-col gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-baseline gap-4 py-2 border-b border-line"
            >
              <span className="font-mono text-xs text-acid">{link.index}</span>
              <span className="font-sans text-4xl font-semibold tracking-tight text-paper">{link.label}</span>
            </a>
          ))}
          <a
            href={CV_URL}
            download="Aicha_Azeroual_CV.pdf"
            className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] bg-acid text-night px-4 py-3 rounded-full"
          >
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
