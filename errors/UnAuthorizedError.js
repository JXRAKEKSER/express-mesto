class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnAuthorizedError';
  }

  sendError(res) {
    return res.status(this.statusCode).json({ message: this.message });
  }
}

module.exports = UnAuthorizedError;
