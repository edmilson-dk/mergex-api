export class ExistingUserError extends Error implements DomainError {
  constructor(email: string) {
    super(`The user with email ${email} already exists`);
    this.name = 'ExistingUserError';
  }
}
