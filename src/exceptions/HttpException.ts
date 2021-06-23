export default class HttpException extends Error {
  public status;
  public message;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
