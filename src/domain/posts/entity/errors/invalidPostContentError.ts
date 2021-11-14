export class InvalidPostContentError extends Error implements DomainError {
  constructor(content: string) {
    super(`The content [${content}] is invalid.`);
    this.name = 'InvalidPostContentError';
  }
}
