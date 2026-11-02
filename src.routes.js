'use strict';

// Minimal `--flag value` parser for the arguments passed by the native layer.
function parseArgs(argv) {
  const out = { port: 3000, host: '127.0.0.1', token: '', cwd: '' };
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    const value = argv[i + 1];
    switch (key) {
      case '--port': out.port = parseInt(value, 10) || out.port; break;
      case '--host': out.host = value || out.host; break;
      case '--token': out.token = value || ''; break;
      case '--cwd': out.cwd = value || ''; break;
    }
  }
  return out;
}

module.exports = { parseArgs };
