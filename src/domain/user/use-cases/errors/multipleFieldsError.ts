export class MultipleFieldsError extends Error implements DomainError {
  constructor(fields: { [key: string]: string }[]) {
    super(`Multiple fields invalid: ${JSON.stringify(fields)}`);
    this.name = 'MultipleFieldsError';
  }
}
