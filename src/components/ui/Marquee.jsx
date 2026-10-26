const items = [
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Supabase',
  'WhatsApp Cloud API',
  'Botpress',
  'Docker',
  'Tailwind CSS',
];

const Track = ({ hidden = false }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
    {items.map((item) => (
      <li key={item} className="flex items-center">
        <span className="px-6 font-sans text-2xl sm:text-3xl font-semibold tracking-tight">{item}</span>
        <span className="text-xl">✦</span>
      </li>
    ))}
  </ul>
);

const Marquee = () => (
  <div className="relative py-10 overflow-hidden">
    <div className="-rotate-2 scale-105 bg-acid text-night py-4">
      <div className="flex w-max animate-marquee">
        <Track />
        <Track hidden />
      </div>
    </div>
  </div>
);

export default Marquee;
