import { useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import api from '../lib/api';
import emptyProject from './emptyProject';

const CATEGORIES = ['Full stack', 'Front end', 'Back end', 'Integration', 'Automation'];

const inputClass =
  'w-full min-w-0 rounded-lg border border-line bg-night px-3 py-2.5 text-paper placeholder:text-mute/70 focus:outline-none focus:border-acid';

const Field = ({ label, hint, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mute">{label}</span>
    {children}
    {hint && <span className="text-xs text-mute">{hint}</span>}
  </label>
);

const ProjectForm = ({ initial, onCancel, onSave }) => {
  const [values, setValues] = useState({ ...emptyProject, ...initial, stack: initial.stack || [] });
  const [stackText, setStackText] = useState((initial.stack || []).join(', '));
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError('');

    try {
      // Our API signs the upload; the file itself goes straight to Cloudinary
      const { uploadUrl, apiKey, folder, timestamp, signature } = await api('/upload', { method: 'POST' });
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', apiKey);
      form.append('folder', folder);
      form.append('timestamp', timestamp);
      form.append('signature', signature);

      const response = await fetch(uploadUrl, { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Upload rejected');
      setValues((prev) => ({ ...prev, image: data.secure_url }));
    } catch (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`);
    }
    setIsUploading(false);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    const stack = stackText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const result = await onSave({
      ...values,
      title: values.title.trim(),
      summary: values.summary.trim(),
      stack,
      image: values.image || null,
      live: (values.live || '').trim() || null,
      code: (values.code || '').trim() || null,
    });

    if (result?.error) {
      setError(result.error);
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-coal p-5 sm:p-7 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{initial.id ? 'Edit project' : 'New project'}</h2>
        <button type="button" onClick={onCancel} className="text-mute hover:text-paper" aria-label="Close">
          <X size={20} />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Field label="Title *">
            <input required value={values.title} onChange={set('title')} className={inputClass} placeholder="WhatsApp support bot" />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Summary" hint="One or two sentences: what it does and the problem it solves.">
            <textarea
              rows={3}
              value={values.summary}
              onChange={set('summary')}
              className={`${inputClass} resize-y`}
              placeholder="Answers customer questions on WhatsApp and hands complex cases to a human agent."
            />
          </Field>
        </div>

        <Field label="Category">
          <input list="project-categories" value={values.category} onChange={set('category')} className={inputClass} />
          <datalist id="project-categories">
            {CATEGORIES.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </Field>

        <Field label="Year">
          <input value={values.year} onChange={set('year')} className={inputClass} placeholder="2025" />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Tech stack" hint="Separate with commas.">
            <input
              value={stackText}
              onChange={(e) => setStackText(e.target.value)}
              className={inputClass}
              placeholder="Node.js, Express, PostgreSQL, WhatsApp Cloud API"
            />
          </Field>
        </div>

        <Field label="Live link">
          <input type="url" value={values.live || ''} onChange={set('live')} className={inputClass} placeholder="https://…" />
        </Field>

        <Field label="Code link">
          <input type="url" value={values.code || ''} onChange={set('code')} className={inputClass} placeholder="https://github.com/…" />
        </Field>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mute">Image</span>
          <div className="flex flex-wrap items-center gap-4">
            {values.image ? (
              <div className="relative">
                <img src={values.image} alt="" className="h-24 w-36 rounded-lg object-cover border border-line" />
                <button
                  type="button"
                  onClick={() => setValues((prev) => ({ ...prev, image: '' }))}
                  className="absolute -top-2 -right-2 rounded-full bg-night border border-line p-1 text-mute hover:text-paper"
                  aria-label="Remove image"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="h-24 w-36 rounded-lg bg-acid text-night flex items-end p-2 font-display italic text-lg leading-none">
                No image
              </div>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-acid">
              {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
              {isUploading ? 'Uploading…' : 'Upload image'}
              <input type="file" accept="image/*" onChange={uploadImage} className="sr-only" disabled={isUploading} />
            </label>
          </div>
          <span className="text-xs text-mute">Optional. Landscape images (4:3 or 16:10) look best. Without one, a lime title card is shown.</span>
        </div>

        <label className="sm:col-span-2 inline-flex items-center gap-3 text-paper">
          <input type="checkbox" checked={values.published} onChange={set('published')} className="h-4 w-4 accent-[#d7ff3a]" />
          Show on the portfolio
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 font-semibold text-night disabled:opacity-60"
        >
          {isSaving && <Loader2 size={16} className="animate-spin" />}
          Save project
        </button>
        <button type="button" onClick={onCancel} className="rounded-full px-5 py-3 text-mute hover:text-paper">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
