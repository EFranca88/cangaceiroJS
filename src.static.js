'use strict';

const fs = require('fs');
const path = require('path');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

/**
 * Serves files from `publicDir` for GET requests. Returns true if the request
 * was handled (file found and sent), false otherwise so the caller can fall
 * through to the API router. Static assets are intentionally unauthenticated —
 * they are only the UI shell; the API itself stays token-protected.
 */
function tryServeStatic(publicDir, pathname, res) {
  // Map "/" to the dashboard shell.
  let rel = pathname === '/' ? '/index.html' : pathname;

  // Decode and block path traversal.
  let decoded;
  try {
    decoded = decodeURIComponent(rel);
  } catch {
    return false;
  }
  if (decoded.includes('\0') || decoded.includes('..')) return false;

  const filePath = path.join(publicDir, decoded);
  // Ensure the resolved path stays inside publicDir.
  if (!path.resolve(filePath).startsWith(path.resolve(publicDir))) return false;

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return false;
  }
  if (!stat.isFile()) return false;

  const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  fs.createReadStream(filePath).pipe(res);
  return true;
}

module.exports = { tryServeStatic };
