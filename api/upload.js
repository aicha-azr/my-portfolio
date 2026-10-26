import { createHash } from 'node:crypto';
import { requireAdmin } from './_lib/auth.js';
import { getBody, httpError, route, send } from './_lib/http.js';

// Images go through Cloudinary's image pipeline; the CV is stored as-is (raw)
const KINDS = {
  image: { resourceType: 'image', folder: 'portfolio' },
  cv: { resourceType: 'raw', folder: 'portfolio/cv' },
};

// Signs a Cloudinary upload so the browser can send the file straight to Cloudinary
export default route({
  POST: (req, res) => {
    requireAdmin(req);
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      throw httpError(500, 'Cloudinary is not configured');
    }

    const { resourceType, folder } = KINDS[getBody(req).kind || 'image'] || KINDS.image;
    const timestamp = Math.round(Date.now() / 1000);
    const signature = createHash('sha1')
      .update(`folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
      .digest('hex');

    send(res, 200, {
      uploadUrl: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      apiKey: CLOUDINARY_API_KEY,
      folder,
      timestamp,
      signature,
    });
  },
});
