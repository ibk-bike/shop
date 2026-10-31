// Step 2 test: only checks that the D1 database is connected. App itself is unchanged.
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/api/ping') {
      try {
        const r = await env.DB.prepare('SELECT COUNT(*) AS n FROM docs').first();
        return Response.json({ ok: true, message: 'D1 connected', docs: r.n });
      } catch (e) {
        return Response.json({ ok: false, error: String((e && e.message) || e) }, { status: 500 });
      }
    }
    return env.ASSETS.fetch(req);
  },
};
