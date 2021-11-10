export class InvalidGithubCodeError extends Error implements ServicesError {
  constructor(code: string) {
    super(`The code ${code} is invalid`);
    this.name = 'InvalidGithubCodeError';
  }
}
