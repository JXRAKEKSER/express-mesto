module.exports = (req, res, next) => {
  req.user = {
    id: '61fe7130ace9c2cb6fcb81ed',
  };
  next();
};
