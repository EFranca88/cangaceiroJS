'use strict';

// Entry point for the embedded Node runtime. Invoked by the native layer as:
//    node main.js --port 3000 --host 127.0.0.1 --token <secret> --cwd <path>

// Kept dependency-free on purpose: no node_modules to bundle, no native addons
// to cross-compile, smaller APK, and nothing to drift out of date.

const { createServer } = require('./src/server');
const { parseArgs } = require('./src/args');

const config = parseArgs(process.argv.slice(2));

// Run from the app-private working directory so any files we read/write land
// in a real, writable filesystem path (not the read-only APK assets).
if (config.cwd) {
  try {
    process.chdir(config.cwd);
  } catch (err) {
    console.error('Failed to chdir to', config.cwd, err.message);
  }
}

const server = createServer(config);

server.listen(config.port, config.host, () => {
  console.log(`[node] listening on http://${config.host}:${config.port}`);
});

// Surface fatal errors to logcat instead of dying silently.
server.on('error', (err) => {
  console.error('[node] server error:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('[node] uncaught exception:', err);
});
