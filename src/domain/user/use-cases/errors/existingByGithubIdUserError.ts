export class ExistingByGithubIdUserError extends Error implements DomainError {
  constructor(githubId: string) {
    super(`The user with github id [${githubId}] already exists`);
    this.name = 'ExistingByGithubIdUserError';
  }
}
