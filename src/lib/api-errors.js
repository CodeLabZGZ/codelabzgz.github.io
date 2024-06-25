import { message } from "statuses"

export class HTTPException extends Error {
  constructor(code, msg) {
    super(msg || message[code]);
    this.name = this.constructor.name;
    this.statusCode = code;
  }
}

export class NotFoundException extends HTTPException {
  constructor(msg) { super(404, msg); }
}

export class ConflictException extends HTTPException {
  constructor(msg) { super(409, msg); }
}