import { checkPassword, clearSession, isAdmin, setSession } from './_lib/auth.js';
import { getBody, httpError, route, send } from './_lib/http.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default route({
  GET: (req, res) => send(res, 200, { authenticated: isAdmin(req) }),

  POST: async (req, res) => {
    const { password } = getBody(req);
    if (!password || !checkPassword(password)) {
      // Slow down password guessing
      await sleep(1000);
      throw httpError(401, 'Wrong password');
    }
    setSession(res);
    send(res, 200, { authenticated: true });
  },

  DELETE: (req, res) => {
    clearSession(res);
    send(res, 200, { authenticated: false });
  },
});
