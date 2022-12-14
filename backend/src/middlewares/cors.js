const allowedCors = [
  'http://mesto.vb.nomoredomains.sbs',
  'https://mesto.vb.nomoredomains.sbs',
  'http://api.mesto.vb.nomoredomains.sbs',
  'https://api.mesto.vb.nomoredomains.sbs',
  'http://localhost: 3000',
  'https://localhost: 3000',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.send();
    return;
  }

  next();
});
