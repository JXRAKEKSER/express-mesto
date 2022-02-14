class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }

  sendError(res) {
    return res.status(this.statusCode).json({ message: this.message });
  }
}

module.exports = ForbiddenError;
