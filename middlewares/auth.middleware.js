module.exports = (req, res, next) => {
  req.user = {
    _id: '61fe7130ace9c2cb6fcb81ed',
  };
  next();
};
