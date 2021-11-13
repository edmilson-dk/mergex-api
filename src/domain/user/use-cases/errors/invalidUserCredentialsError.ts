export class InvalidUserCredentialsError extends Error implements DomainError {
  constructor() {
    super(`Invalid user credentials`);
    this.name = 'InvalidUserCredentialsError';
  }
}
