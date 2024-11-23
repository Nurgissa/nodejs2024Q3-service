export class RecordAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
  }
}
