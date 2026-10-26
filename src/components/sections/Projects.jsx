import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import useProjects from '../../hooks/useProjects';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const ProjectLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-1 text-paper hover:text-acid transition-colors"
  >
    {children} <ArrowUpRight size={14} />
  </a>
);

const Projects = () => {
  const { status, projects } = useProjects();
  const previewRef = useRef(null);
  const [active, setActive] = useState(null);

  // The preview image follows the cursor on pointer devices
  const handleMouseMove = (e) => {
    if (!previewRef.current) return;
    const x = Math.min(e.clientX + 24, window.innerWidth - 360);
    previewRef.current.style.transform = `translate(${x}px, ${e.clientY - 120}px)`;
  };

  const activeProject = active === null ? null : projects[active];

  return (
    <section id="work" className="py-28 flex flex-col gap-16">
      <SectionHeading index="01" label="Selected work">
        Things I&apos;ve <span className="font-display italic font-normal">shipped</span>
      </SectionHeading>

      {status === 'loading' && (
        <ol className="border-t border-line" aria-label="Loading projects">
          {[0, 1, 2].map((i) => (
            <li key={i} className="border-b border-line py-10 flex flex-col gap-4 animate-pulse">
              <span className="h-12 w-2/3 max-w-md rounded bg-coal" />
              <span className="h-4 w-full max-w-xl rounded bg-coal" />
            </li>
          ))}
        </ol>
      )}

      {status !== 'loading' && projects.length === 0 && (
        <Reveal className="border-y border-line py-14 flex flex-col gap-4">
          <p className="font-display italic text-4xl sm:text-5xl text-paper">New work is on its way.</p>
          <p className="text-mute max-w-xl">
            I&apos;m putting together case studies of recent projects. In the meantime, have a look at my{' '}
            <a href="https://github.com/aicha-azr" target="_blank" rel="noreferrer" className="text-acid hover:underline">
              GitHub
            </a>{' '}
            or <a href="#contact" className="text-acid hover:underline">get in touch</a>.
          </p>
        </Reveal>
      )}

      {projects.length > 0 && (
        <ol className="border-t border-line" onMouseMove={handleMouseMove} onMouseLeave={() => setActive(null)}>
          {projects.map((project, index) => {
            const mainLink = project.live || project.code;
            return (
              <Reveal
                as="li"
                key={project.id}
                delay={index * 60}
                onMouseEnter={() => setActive(index)}
                className="group border-b border-line"
              >
                <div className="grid grid-cols-12 gap-x-4 gap-y-4 py-8 md:py-10 transition-colors md:group-hover:bg-coal/60 md:px-4 md:-mx-4">
                  <span className="col-span-2 md:col-span-1 font-mono text-sm text-mute pt-2 md:pt-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="col-span-10 md:col-span-7 flex flex-col gap-4 min-w-0">
                    {mainLink ? (
                      <a
                        href={mainLink}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] text-paper break-words transition-all duration-300 md:group-hover:translate-x-3 md:group-hover:text-acid"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <h3 className="font-sans font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] text-paper break-words transition-all duration-300 md:group-hover:translate-x-3 md:group-hover:text-acid">
                        {project.title}
                      </h3>
                    )}
                    {project.summary && <p className="text-mute max-w-xl leading-relaxed">{project.summary}</p>}
                    {project.image && (
                      <img
                        src={project.image}
                        alt=""
                        loading="lazy"
                        className="md:hidden w-full aspect-[16/10] object-cover rounded-xl border border-line"
                      />
                    )}
                    {project.stack.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="font-mono text-[11px] uppercase tracking-wider text-paper/70 border border-line rounded-full px-3 py-1"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto flex md:flex-col md:items-end justify-between gap-4 md:pt-4">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-mute whitespace-nowrap">
                      {[project.category, project.year].filter(Boolean).join(' · ')}
                    </span>
                    <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.15em]">
                      {project.live && <ProjectLink href={project.live}>Live</ProjectLink>}
                      {project.code && <ProjectLink href={project.code}>Code</ProjectLink>}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      )}

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block transition-transform duration-200 ease-out"
      >
        <div
          className={`w-80 aspect-[4/3] overflow-hidden rounded-xl border border-line bg-coal shadow-2xl transition-all duration-300 ${
            activeProject ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-90 rotate-0'
          }`}
        >
          {activeProject?.image ? (
            <img src={activeProject.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex flex-col justify-between p-6 bg-acid text-night">
              <span className="font-mono text-xs uppercase tracking-[0.2em]">{activeProject?.category}</span>
              <span className="font-display italic text-5xl leading-none break-words">{activeProject?.title}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
