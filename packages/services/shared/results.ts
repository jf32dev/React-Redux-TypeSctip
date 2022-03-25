export default class Result<T, E = any> {
  private readonly requestId: string;

  public value: T;

  public error?: E;

  constructor(value: T, requestId: string, error?: E) {
    this.value = value;
    this.requestId = requestId;
    this.error = error;
  }

  public get hasError(): boolean {
    if (typeof this.error === 'undefined' || this.error === null) {
      return false;
    }
    return true;
  }

  public get getRequestId(): string {
    return this.requestId;
  }
}
