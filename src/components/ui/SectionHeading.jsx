import Reveal from './Reveal';

const SectionHeading = ({ index, label, children }) => (
  <Reveal className="flex flex-col gap-6">
    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-mute">
      <span className="text-acid">{index}</span>
      <span className="h-px w-12 bg-line" />
      <span>{label}</span>
    </div>
    <h2 className="font-sans font-semibold text-paper tracking-[-0.04em] leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
      {children}
    </h2>
  </Reveal>
);

export default SectionHeading;
