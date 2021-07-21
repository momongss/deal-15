module.exports = {
  port: normalizePort(process.env.PORT, '3000'),
  env: process.env.NODE_ENV || 'production',
};

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
