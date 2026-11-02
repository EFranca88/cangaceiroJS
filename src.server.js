'use strict';

const http = require('http');
const path = require('path');
const { Router } = require('./router');
const { tryServeStatic } = require('./static');
const routes = require('./routes');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

/**
 * Builds the HTTP server: static UI shell, CORS handling, token auth, JSON body
 * parsing, and the application routes. `/health` and the static shell are left
 * unauthenticated; everything under the API requires the shared token.
 */
function createServer(config) {
  const router = new Router();
  routes.register(router);

  return http.createServer(async (req, res) => {
    // --- CORS (locked down; reflect only loopback origins) -------------------
    const origin = req.headers.origin;
    if (origin && /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204).end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    // --- Static UI shell (unauthenticated) ----------------------------------
    if (req.method === 'GET' && tryServeStatic(PUBLIC_DIR, url.pathname, res)) {
      return;
    }

    // --- Auth: every route except /health requires the shared token ---------
    if (url.pathname !== '/health' && config.token) {
      const provided = req.headers['x-auth-token'];
      if (provided !== config.token) {
        return sendJson(res, 401, { error: 'unauthorized' });
      }
    }

    try {
      const body = await readJsonBody(req);
      await router.handle(req.method, url.pathname, { req, res, url, body, sendJson });
    } catch (err) {
      console.error('[node] request error:', err);
      if (!res.headersSent) sendJson(res, 500, { error: 'internal_error' });
    }
  });
}

function sendJson(res, status, payload) {
  const data = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(data);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET' || req.method === 'HEAD') return resolve(null);
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > 1_000_000) { // 1 MB cap
        reject(new Error('payload too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      if (chunks.length === 0) return resolve(null);
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        resolve(null); // tolerate non-JSON bodies
      }
    });
    req.on('error', reject);
  });
}

module.exports = { createServer };
