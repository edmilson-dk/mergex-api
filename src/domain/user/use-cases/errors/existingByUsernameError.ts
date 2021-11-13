export class ExistingByUsernameUserError extends Error implements DomainError {
  constructor(username: string) {
    super(`The user with username ${username} already exists`);
    this.name = 'ExistingByUsernameUserError';
  }
}
