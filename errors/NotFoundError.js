class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }

  send(res) {
    return res.status(this.status).json({ message: this.message });
  }
}

module.exports = NotFoundError;
