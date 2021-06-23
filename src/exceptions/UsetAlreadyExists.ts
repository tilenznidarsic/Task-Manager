import HttpException from "./HttpException";

export default class UserAlreadyExists extends HttpException {
  constructor() {
    super(401, "User already exists!");
  }
}
