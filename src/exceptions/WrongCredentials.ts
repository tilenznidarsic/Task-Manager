import HttpException from "./HttpException";

export default class WrongCredentials extends HttpException {
  constructor() {
    super(401, "Wrong credentials!");
  }
}
