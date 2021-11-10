export class NotFoundUserError extends Error implements ServicesError {
  constructor(code: string) {
    super(`The user with code ${code} was not found`);
    this.name = 'NotFoundUserError';
  }
}
