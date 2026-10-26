import { useEffect, useState } from 'react';
import { Download, FileUp, Loader2, RotateCcw } from 'lucide-react';
import api from '../lib/api';

// The download is served by our API, which can't send more than 4.5 MB
const MAX_BYTES = 4 * 1024 * 1024;

const formatSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

const CvPanel = ({ onSignedOut }) => {
  const [cv, setCv] = useState(undefined);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/cv?meta=1')
      .then((data) => setCv(data.cv))
      .catch((loadError) => {
        setCv(null);
        setError(loadError.message);
      });
  }, []);

  const run = async (request) => {
    setIsBusy(true);
    setError('');
    try {
      await request();
    } catch (requestError) {
      if (requestError.message === 'Please sign in again') onSignedOut();
      else setError(requestError.message);
    }
    setIsBusy(false);
  };

  const upload = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf') return setError('Please choose a PDF file.');
    if (file.size > MAX_BYTES) return setError(`The CV must be 4 MB or smaller (this one is ${formatSize(file.size)}).`);

    run(async () => {
      // Our API signs the upload; the file itself goes straight to Cloudinary
      const { uploadUrl, apiKey, folder, timestamp, signature } = await api('/upload', {
        method: 'POST',
        body: { kind: 'cv' },
      });
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', apiKey);
      form.append('folder', folder);
      form.append('timestamp', timestamp);
      form.append('signature', signature);

      const response = await fetch(uploadUrl, { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(`Upload failed: ${data.error?.message || 'rejected'}`);

      const saved = await api('/cv', {
        method: 'PUT',
        body: { url: data.secure_url, fileName: file.name, bytes: file.size },
      });
      setCv(saved.cv);
    });
  };

  const reset = () => {
    if (!window.confirm('Go back to the CV that ships with the site?')) return;
    run(async () => {
      await api('/cv', { method: 'DELETE' });
      setCv(null);
    });
  };

  return (
    <section className="rounded-2xl border border-line bg-coal p-5 sm:p-7 flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">CV</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mute">Download CV button</span>
      </div>

      {cv === undefined ? (
        <Loader2 className="animate-spin text-mute" />
      ) : cv ? (
        <p className="text-paper">
          {cv.fileName}
          <span className="text-mute">
            {' '}
            · {formatSize(cv.bytes)} · uploaded {new Date(cv.uploadedAt).toLocaleDateString()}
          </span>
        </p>
      ) : (
        <p className="text-mute">Using the CV that ships with the site. Upload a PDF to replace it.</p>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <label
          className={`inline-flex items-center gap-2 rounded-full bg-acid px-5 py-2.5 text-sm font-semibold text-night ${
            isBusy ? 'opacity-60' : 'cursor-pointer'
          }`}
        >
          {isBusy ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
          {isBusy ? 'Saving…' : cv ? 'Replace CV' : 'Upload CV'}
          <input type="file" accept="application/pdf" onChange={upload} className="sr-only" disabled={isBusy} />
        </label>
        <a
          href="/api/cv"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-paper"
        >
          <Download size={14} /> Test download
        </a>
        {cv && (
          <button
            type="button"
            onClick={reset}
            disabled={isBusy}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-mute hover:text-paper disabled:opacity-60"
          >
            <RotateCcw size={14} /> Use default
          </button>
        )}
      </div>
      <p className="text-xs text-mute">PDF only, 4 MB max. Visitors download it as Aicha_Azeroual_CV.pdf.</p>
    </section>
  );
};

export default CvPanel;
