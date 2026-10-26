import { createHash, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { httpError } from './http.js';

const COOKIE = 'admin_token';
const MAX_AGE = 60 * 60 * 24 * 7;

const secret = () => {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) throw httpError(500, 'JWT_SECRET must be set (32+ characters)');
  return value;
};

const hash = (value) => createHash('sha256').update(String(value)).digest();

export const checkPassword = (password) => {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw httpError(500, 'ADMIN_PASSWORD is not set');
  return timingSafeEqual(hash(password), hash(expected));
};

const cookie = (value, maxAge) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
};

export const setSession = (res) => {
  const token = jwt.sign({ role: 'admin' }, secret(), { expiresIn: MAX_AGE });
  res.setHeader('Set-Cookie', cookie(token, MAX_AGE));
};

export const clearSession = (res) => res.setHeader('Set-Cookie', cookie('', 0));

export const isAdmin = (req) => {
  const match = (req.headers.cookie || '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!match) return false;
  try {
    return jwt.verify(match[1], secret()).role === 'admin';
  } catch {
    return false;
  }
};

export const requireAdmin = (req) => {
  if (!isAdmin(req)) throw httpError(401, 'Please sign in again');
};
