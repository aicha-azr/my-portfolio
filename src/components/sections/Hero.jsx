import { ArrowDown } from 'lucide-react';
import Terminal from '../ui/Terminal';

const Hero = () => (
  <section id="home" className="relative min-h-[100svh] flex flex-col justify-center pt-28 pb-16">
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-mute animate-rise"
    >
      <span className="flex items-center gap-2 text-paper">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
        </span>
        Available for work
      </span>
      <span>Full-stack developer</span>
      <span>Morocco</span>
    </div>

    <h1 className="mt-8 text-paper leading-[0.86] tracking-[-0.05em]">
      <span
        className="block font-sans font-bold text-[clamp(4.5rem,17vw,13.5rem)] animate-rise"
        style={{ animationDelay: '80ms' }}
      >
        Aicha
      </span>
      <span
        className="block font-display italic font-normal tracking-[-0.03em] text-[clamp(4.5rem,17vw,13.5rem)] sm:pl-[12vw] animate-rise"
        style={{ animationDelay: '160ms' }}
      >
        Azeroual<span className="text-acid not-italic font-sans">.</span>
      </span>
    </h1>

    <div className="mt-14 grid lg:grid-cols-12 gap-12 items-end">
      <div className="lg:col-span-5 flex flex-col gap-8 animate-rise" style={{ animationDelay: '260ms' }}>
        <p className="text-xl sm:text-2xl leading-snug text-paper/90 max-w-md">
          I build web apps end to end — the API, the auth, and the interface people{' '}
          <span className="font-display italic text-acid text-[1.15em]">actually click.</span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 bg-acid text-night font-semibold px-6 py-3.5 rounded-full hover:-translate-y-0.5 transition-transform"
          >
            See the work <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3.5 rounded-full border border-paper/25 text-paper hover:border-paper transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 animate-rise" style={{ animationDelay: '380ms' }}>
        <Terminal />
      </div>
    </div>
  </section>
);

export default Hero;
