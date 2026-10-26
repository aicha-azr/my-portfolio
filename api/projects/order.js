import { getProjectsCollection } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';
import { getBody, httpError, route, send } from '../_lib/http.js';
import { toObjectId } from '../_lib/project.js';

// Body: { ids: [...] } in the new display order
export default route({
  PUT: async (req, res) => {
    requireAdmin(req);
    const { ids } = getBody(req);
    if (!Array.isArray(ids) || ids.length > 200) throw httpError(400, 'ids must be an array');

    const projects = await getProjectsCollection();
    if (ids.length) {
      await projects.bulkWrite(
        ids.map((id, position) => ({
          updateOne: { filter: { _id: toObjectId(id) }, update: { $set: { position } } },
        })),
      );
    }
    send(res, 200, { ok: true });
  },
});
