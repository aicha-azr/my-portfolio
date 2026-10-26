import { getProjectsCollection } from '../_lib/db.js';
import { isAdmin, requireAdmin } from '../_lib/auth.js';
import { getBody, route, send } from '../_lib/http.js';
import { parseProject, toJson } from '../_lib/project.js';

export default route({
  // Public: published projects. Admin with ?all=1: hidden ones too.
  GET: async (req, res) => {
    const includeHidden = req.query?.all === '1' && isAdmin(req);
    const projects = await getProjectsCollection();
    const docs = await projects
      .find(includeHidden ? {} : { published: true })
      .sort({ position: 1, createdAt: -1 })
      .toArray();
    send(res, 200, docs.map(toJson));
  },

  POST: async (req, res) => {
    requireAdmin(req);
    const project = parseProject(getBody(req));
    const projects = await getProjectsCollection();
    const [last] = await projects.find().sort({ position: -1 }).limit(1).toArray();
    const doc = { ...project, position: last ? last.position + 1 : 0, createdAt: new Date() };
    const { insertedId } = await projects.insertOne(doc);
    send(res, 201, toJson({ _id: insertedId, ...doc }));
  },
});
