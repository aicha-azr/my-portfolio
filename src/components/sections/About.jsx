import me from '../../assets/aicha-portrait.jpg';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const path = [
  { years: '2019 — 20', title: 'Baccalauréat, Mathematical Sciences', place: 'Lycée technique Anwal' },
  { years: '2020 — 23', title: 'Licence, Mathematics & Computer Science', place: 'Hassan II University' },
  { years: '2023 — 24', title: 'MERN stack application developer', place: 'Simplon Maghreb × JobInTech, Casablanca' },
  { years: '2024 →', title: 'Building full-stack products & integrations', place: 'APIs, databases, chatbots and third-party platforms' },
];

const toolbox = [
  { label: 'Frontend', items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT'] },
  { label: 'Databases', items: ['PostgreSQL', 'Supabase', 'MongoDB', 'Mongoose', 'Redis'] },
  {
    label: 'Integrations',
    items: [
      'Meta WhatsApp Cloud API',
      'Botpress',
      'Google Drive API',
      'Google Calendar API',
      'Slack API',
      'TikTok integrations',
    ],
  },
  {
    label: 'Tools',
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'Docker',
      'Linux',
      'Postman',
      'Swagger/OpenAPI',
      'VS Code',
      'Figma',
      'Cloudinary',
      'Vercel',
      'Render',
    ],
  },
];

const About = () => (
  <section id="about" className="py-28 flex flex-col gap-16">
    <SectionHeading index="02" label="About">
      Maths first, <span className="font-display italic font-normal">then code</span>
    </SectionHeading>

    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <div className="relative max-w-sm">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-acid" />
          <div className="group relative overflow-hidden rounded-2xl bg-coal">
            <img
              src={me}
              alt="Aicha Azeroual"
              className="w-full aspect-[4/5] object-cover object-[50%_20%] grayscale contrast-125 transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>
        </div>
      </Reveal>

      <div className="lg:col-span-7 flex flex-col gap-14">
        <Reveal as="p" className="text-xl sm:text-2xl leading-snug text-paper/90">
          I studied mathematics and computer science, so I tend to treat an app like a problem to
          reason through: model the data, secure the access, then make the interface feel effortless.
          Since training as a <span className="text-acid">MERN stack developer</span>, I&apos;ve been
          shipping projects across the whole stack.
        </Reveal>

        <ol className="flex flex-col">
          {path.map((step, index) => (
            <Reveal
              as="li"
              key={step.years}
              delay={index * 80}
              className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 py-5 border-t border-line last:border-b"
            >
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-acid pt-1">{step.years}</span>
              <div>
                <p className="text-paper font-medium">{step.title}</p>
                <p className="text-mute text-sm mt-1">{step.place}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="flex flex-col gap-5">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Toolbox</h3>
          <dl className="flex flex-col">
            {toolbox.map((group, index) => (
              <Reveal
                key={group.label}
                delay={index * 60}
                className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 py-4 border-t border-line last:border-b"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-acid pt-1.5">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-paper border border-line rounded-full px-3 py-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default About;
