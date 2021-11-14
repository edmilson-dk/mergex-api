export class NotExistsUserByGithubIdError extends Error implements DomainError {
  constructor(githubId: string) {
    super(`User with github id [${githubId}] not exists`);
    this.name = 'NotExistsUserByGithubIdError';
  }
}
