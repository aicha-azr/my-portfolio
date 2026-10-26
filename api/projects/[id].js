import { getProjectsCollection } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';
import { getBody, httpError, route, send } from '../_lib/http.js';
import { parseProject, toJson, toObjectId } from '../_lib/project.js';

export default route({
  PUT: async (req, res) => {
    requireAdmin(req);
    const _id = toObjectId(req.query.id);
    const projects = await getProjectsCollection();
    const doc = await projects.findOneAndUpdate(
      { _id },
      { $set: { ...parseProject(getBody(req)), updatedAt: new Date() } },
      { returnDocument: 'after' },
    );
    if (!doc) throw httpError(404, 'Project not found');
    send(res, 200, toJson(doc));
  },

  DELETE: async (req, res) => {
    requireAdmin(req);
    const _id = toObjectId(req.query.id);
    const projects = await getProjectsCollection();
    const { deletedCount } = await projects.deleteOne({ _id });
    if (!deletedCount) throw httpError(404, 'Project not found');
    send(res, 200, { ok: true });
  },
});
