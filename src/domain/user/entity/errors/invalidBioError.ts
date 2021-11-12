export class InvalidBioError extends Error implements DomainError {
  constructor(bio: string) {
    super(`The bio [${bio}] is invalid.`);
    this.name = 'InvalidBioError';
  }
}
