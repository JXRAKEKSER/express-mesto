class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }

  sendError(res) {
    return res.status(this.statusCode).json({ message: this.message });
  }
}

module.exports = ValidationError;
