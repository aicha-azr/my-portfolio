import { ObjectId } from 'mongodb';
import { httpError } from './http.js';

const text = (value, max) => String(value ?? '').trim().slice(0, max);

// Only http(s) links, so nothing like javascript: can reach the page
const url = (value, field) => {
  const trimmed = text(value, 500);
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.toString();
  } catch {
    // fall through
  }
  throw httpError(400, `${field} must be a full http(s) link`);
};

export const parseProject = (input) => {
  const title = text(input.title, 120);
  if (!title) throw httpError(400, 'Title is required');

  return {
    title,
    summary: text(input.summary, 600),
    category: text(input.category, 40),
    year: text(input.year, 20),
    stack: (Array.isArray(input.stack) ? input.stack : [])
      .map((item) => text(item, 40))
      .filter(Boolean)
      .slice(0, 20),
    image: url(input.image, 'Image'),
    live: url(input.live, 'Live link'),
    code: url(input.code, 'Code link'),
    published: input.published !== false,
  };
};

export const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) throw httpError(404, 'Project not found');
  return new ObjectId(id);
};

export const toJson = ({ _id, ...doc }) => ({ id: _id.toString(), ...doc });
