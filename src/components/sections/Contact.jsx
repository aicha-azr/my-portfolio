import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import Reveal from '../ui/Reveal';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL = 'aichaazeroual03@gmail.com';

const initialForm = { name: '', email: '', subject: '', message: '' };

const fieldClass =
  'w-full min-w-0 bg-transparent border-0 border-b border-line px-0 py-3 text-lg text-paper placeholder:text-mute focus:outline-none focus:ring-0 focus:border-acid transition-colors';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState(initialForm);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error('Could not copy — the address is ' + EMAIL));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast.error('Contact form is not configured yet.');
      return;
    }

    setIsSending(true);
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        toast.success('Message sent — thank you!');
        setFormData(initialForm);
      })
      .catch(() => {
        toast.error('Something went wrong, please try again.');
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section id="contact" className="py-28 flex flex-col gap-16">
      <Reveal className="flex flex-col gap-6">
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-mute">
          <span className="text-acid">03</span>
          <span className="h-px w-12 bg-line" />
          <span>Contact</span>
        </div>
        <h2 className="font-sans font-bold text-paper tracking-[-0.05em] leading-[0.88] text-[clamp(3.5rem,11vw,9rem)]">
          Let&apos;s build
          <br />
          <span className="font-display italic font-normal text-acid">something.</span>
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-5 flex flex-col gap-10">
          <p className="text-xl text-paper/90 leading-snug max-w-md">
            Hiring, collaborating, or just curious about a project? My inbox is open — I usually reply
            within a couple of days.
          </p>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Email</span>
            <div className="flex items-center gap-3 min-w-0">
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg sm:text-xl text-paper underline decoration-line underline-offset-8 hover:decoration-acid transition-colors break-all"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="shrink-0 p-2 rounded-full border border-line text-mute hover:text-acid hover:border-acid transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">Elsewhere</span>
            <div className="flex gap-6">
              <a
                href="https://github.com/aicha-azr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-paper hover:text-acid transition-colors"
              >
                GitHub <ArrowUpRight size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/azeroual-aicha-a9433a216/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-paper hover:text-acid transition-colors"
              >
                LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal
          as="form"
          ref={form}
          delay={100}
          onSubmit={sendEmail}
          className="lg:col-span-7 flex flex-col gap-6 min-w-0"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className={fieldClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className={fieldClass}
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className={fieldClass}
          />
          <textarea
            name="message"
            placeholder="Tell me about your project"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${fieldClass} resize-none`}
          />
          <button
            type="submit"
            disabled={isSending}
            className="self-start mt-4 inline-flex items-center gap-2 bg-acid text-night font-semibold px-7 py-4 rounded-full hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSending ? 'Sending…' : 'Send message'} <ArrowUpRight size={18} />
          </button>
        </Reveal>
      </div>

      <ToastContainer transition={Slide} theme="dark" />
    </section>
  );
};

export default Contact;
