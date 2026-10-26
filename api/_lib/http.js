// Small helpers that work both on Vercel and in the Vite dev middleware

export const send = (res, status, data) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
};

export const getBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

// Wraps a map of method handlers with 405 and error handling
export const route = (handlers) => async (req, res) => {
  const handler = handlers[req.method];
  if (!handler) {
    res.setHeader('Allow', Object.keys(handlers).join(', '));
    return send(res, 405, { error: 'Method not allowed' });
  }

  try {
    return await handler(req, res);
  } catch (error) {
    console.error(error);
    return send(res, error.status || 500, { error: error.expose ? error.message : 'Server error' });
  }
};

export const httpError = (status, message) => Object.assign(new Error(message), { status, expose: true });
