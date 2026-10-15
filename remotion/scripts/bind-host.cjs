// Preload for `remotion studio`: Studio always binds 0.0.0.0/::, with no --host flag.
// Rebind only the Studio port to BIND_HOST (e.g. the Tailnet address); other servers are untouched.
const net = require('net');
const host = process.env.BIND_HOST;
const port = Number(process.env.BIND_PORT);
const listen = net.Server.prototype.listen;
net.Server.prototype.listen = function (...args) {
  const opts = args[0];
  if (host && opts && typeof opts === 'object' && Number(opts.port) === port) args[0] = {...opts, host};
  return listen.apply(this, args);
};
