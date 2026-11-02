'use strict';

// Application routes. This is where you build your actual API.
// `ctx` = { req, res, url, body, sendJson }.

function register(router) {
  // Unauthenticated readiness probe — used by the native layer to detect
  // when the listener is up. Keep it cheap and side-effect free.
  router.get('/health', (ctx) => {
    ctx.sendJson(ctx.res, 200, { status: 'ok', uptime: process.uptime() });
  });

  // Example: runtime/environment info.
  router.get('/api/info', (ctx) => {
    ctx.sendJson(ctx.res, 200, {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
    });
  });

  // Example: echo a posted JSON body back to the caller.
  router.post('/api/echo', (ctx) => {
    ctx.sendJson(ctx.res, 200, { received: ctx.body });
  });
}

module.exports = { register };
