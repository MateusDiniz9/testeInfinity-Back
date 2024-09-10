class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
export function notFoundError() {
  return new NotFoundError('Resource not found');
}
