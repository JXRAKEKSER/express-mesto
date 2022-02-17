const accessAllowList = [
  'localhost:3000',
  'http://mesto.photocard.nomoredomains.work',
  'https://mesto.photocard.nomoredomains.work',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsHandler = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['Access-Control-Request-Headers'];
  const isAllowOrigin = accessAllowList.includes(origin);
  if (!isAllowOrigin) {
    return res.end();
  }
  res.header('Access-Control-Allow-Origin', origin);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};

module.exports = corsHandler;
