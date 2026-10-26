import { getCollection } from './_lib/db.js';
import { requireAdmin } from './_lib/auth.js';
import { getBody, httpError, route, send } from './_lib/http.js';

// Shipped with the site (public/), served when no CV has been uploaded
const FALLBACK = '/aicha_azeroual.pdf';
const DOWNLOAD_NAME = 'Aicha_Azeroual_CV.pdf';
// Vercel functions can't send responses over 4.5 MB
const MAX_BYTES = 4 * 1024 * 1024;

const getSettings = () => getCollection('settings');

// Only files from our own Cloudinary account, so this route can't be used to fetch arbitrary URLs
const isOwnUpload = (url) =>
  typeof url === 'string' &&
  url.startsWith(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/`);

const toJson = (doc) => (doc ? { url: doc.url, fileName: doc.fileName, bytes: doc.bytes, uploadedAt: doc.uploadedAt } : null);

const redirect = (res, location) => {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
};

export default route({
  // Public: downloads the chosen CV. ?meta=1 returns its details as JSON instead.
  GET: async (req, res) => {
    if (req.query?.meta === '1') {
      const settings = await getSettings();
      return send(res, 200, { cv: toJson(await settings.findOne({ _id: 'cv' })) });
    }

    try {
      const settings = await getSettings();
      const doc = await settings.findOne({ _id: 'cv' });
      if (!doc || !isOwnUpload(doc.url)) return redirect(res, FALLBACK);

      const upstream = await fetch(doc.url);
      if (!upstream.ok) throw new Error(`Cloudinary answered ${upstream.status}`);
      const file = Buffer.from(await upstream.arrayBuffer());
      if (file.subarray(0, 4).toString() !== '%PDF') throw new Error('Stored CV is not a PDF');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${DOWNLOAD_NAME}"`);
      res.setHeader('Content-Length', file.length);
      res.setHeader('Cache-Control', 'no-store');
      return res.end(file);
    } catch (error) {
      // Visitors still get a CV if the database or Cloudinary is unreachable
      console.error(error);
      return redirect(res, FALLBACK);
    }
  },

  PUT: async (req, res) => {
    requireAdmin(req);
    const { url, fileName, bytes } = getBody(req);
    if (!isOwnUpload(url)) throw httpError(400, 'The CV must be uploaded through the admin page');
    if (!Number.isFinite(bytes) || bytes > MAX_BYTES) throw httpError(400, 'The CV must be 4 MB or smaller');

    const doc = {
      url,
      fileName: String(fileName || 'cv.pdf').slice(0, 120),
      bytes,
      uploadedAt: new Date(),
    };
    const settings = await getSettings();
    await settings.updateOne({ _id: 'cv' }, { $set: doc }, { upsert: true });
    send(res, 200, { cv: toJson(doc) });
  },

  // Back to the CV shipped with the site
  DELETE: async (req, res) => {
    requireAdmin(req);
    const settings = await getSettings();
    await settings.deleteOne({ _id: 'cv' });
    send(res, 200, { cv: null });
  },
});
