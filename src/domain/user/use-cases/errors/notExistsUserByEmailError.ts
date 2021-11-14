export class NotExistsUserByEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`User with email [${email}] not exists`);
    this.name = 'NotExistsUserByEmailError';
  }
}
