import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import api from '../lib/api';
import CvPanel from './CvPanel';
import ProjectForm from './ProjectForm';
import emptyProject from './emptyProject';

const inputClass =
  'w-full rounded-lg border border-line bg-night px-3 py-2.5 text-paper placeholder:text-mute/70 focus:outline-none focus:border-acid';

// The fields the API accepts; everything else (id, position, dates) stays server-side
const editable = (project) => Object.fromEntries(Object.keys(emptyProject).map((key) => [key, project[key]]));

const Login = ({ onSignedIn }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await api('/auth', { method: 'POST', body: { password } });
      onSignedIn();
    } catch (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-[12vh] max-w-sm flex flex-col gap-5">
      <h1 className="font-display italic text-5xl">
        Admin<span className="not-italic text-acid">*</span>
      </h1>
      <input
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={inputClass}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-acid px-6 py-3 font-semibold text-night disabled:opacity-60"
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        Sign in
      </button>
    </form>
  );
};

const Dashboard = ({ onSignedOut }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    try {
      setProjects(await api('/projects?all=1'));
    } catch (loadError) {
      setError(loadError.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Every action reloads the list; a 401 means the session expired
  const run = async (request) => {
    setError('');
    try {
      await request();
      await load();
      return null;
    } catch (requestError) {
      if (requestError.message === 'Please sign in again') onSignedOut();
      else setError(requestError.message);
      return { error: requestError.message };
    }
  };

  const save = async (values) => {
    const body = editable(values);
    const result = await run(() =>
      values.id ? api(`/projects/${values.id}`, { method: 'PUT', body }) : api('/projects', { method: 'POST', body }),
    );
    if (!result) setEditing(null);
    return result;
  };

  const remove = (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    run(() => api(`/projects/${project.id}`, { method: 'DELETE' }));
  };

  const togglePublished = (project) =>
    run(() =>
      api(`/projects/${project.id}`, {
        method: 'PUT',
        body: { ...editable(project), published: !project.published },
      }),
    );

  const move = (index, direction) => {
    const reordered = [...projects];
    const target = index + direction;
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setProjects(reordered);
    run(() => api('/projects/order', { method: 'PUT', body: { ids: reordered.map((p) => p.id) } }));
  };

  const signOut = async () => {
    await api('/auth', { method: 'DELETE' }).catch(() => {});
    onSignedOut();
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <div className="flex items-center gap-3">
          <a href="/" className="rounded-full border border-line px-4 py-2 text-sm hover:border-paper">
            View site
          </a>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-paper"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <CvPanel onSignedOut={onSignedOut} />

      {error && (
        <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      {editing ? (
        <ProjectForm key={editing.id || 'new'} initial={editing} onCancel={() => setEditing(null)} onSave={save} />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(emptyProject)}
          className="self-start inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 font-semibold text-night"
        >
          <Plus size={18} /> New project
        </button>
      )}

      {isLoading ? (
        <Loader2 className="animate-spin text-mute" />
      ) : projects.length === 0 ? (
        <p className="text-mute">No projects yet. The portfolio shows a “new work is on its way” message until you add one.</p>
      ) : (
        <ol className="flex flex-col border-t border-line">
          {projects.map((project, index) => (
            <li key={project.id} className="flex items-center gap-4 border-b border-line py-4">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1 text-mute hover:text-paper disabled:opacity-20"
                  aria-label="Move up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === projects.length - 1}
                  className="p-1 text-mute hover:text-paper disabled:opacity-20"
                  aria-label="Move down"
                >
                  <ArrowDown size={14} />
                </button>
              </div>

              {project.image ? (
                <img src={project.image} alt="" className="hidden sm:block h-12 w-16 rounded object-cover border border-line" />
              ) : (
                <span className="hidden sm:block h-12 w-16 rounded bg-acid" />
              )}

              <div className="min-w-0 flex-1">
                <p className={`truncate font-medium ${project.published ? 'text-paper' : 'text-mute line-through'}`}>
                  {project.title}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                  {[project.category, project.year].filter(Boolean).join(' · ')}
                  {!project.published && ' · hidden'}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => togglePublished(project)}
                  className="p-2 text-mute hover:text-paper"
                  aria-label={project.published ? 'Hide from portfolio' : 'Show on portfolio'}
                  title={project.published ? 'Hide from portfolio' : 'Show on portfolio'}
                >
                  {project.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(project)}
                  className="p-2 text-mute hover:text-paper"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(project)}
                  className="p-2 text-mute hover:text-red-400"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

const Admin = () => {
  // undefined while checking the cookie, then true/false
  const [isSignedIn, setIsSignedIn] = useState(undefined);

  useEffect(() => {
    document.title = 'Admin · Aicha Azeroual';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);

    api('/auth')
      .then(({ authenticated }) => setIsSignedIn(authenticated))
      .catch(() => setIsSignedIn(false));

    return () => robots.remove();
  }, []);

  return (
    <div className="min-h-screen bg-night text-paper">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-10">
        {isSignedIn === undefined ? (
          <Loader2 className="animate-spin text-mute" />
        ) : isSignedIn ? (
          <Dashboard onSignedOut={() => setIsSignedIn(false)} />
        ) : (
          <Login onSignedIn={() => setIsSignedIn(true)} />
        )}
      </div>
    </div>
  );
};

export default Admin;
