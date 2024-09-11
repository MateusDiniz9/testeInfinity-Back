class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export function unauthorizedError() {
  return new UnauthorizedError('Access denied');
}
