export class InvalidGithubUsernameError extends Error implements DomainError {
  constructor(username: string) {
    super(`The username [${username}] is invalid.`);
    this.name = 'InvalidGithubUsernameError';
  }
}
