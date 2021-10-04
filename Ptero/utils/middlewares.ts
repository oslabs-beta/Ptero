import {
  Context,
  MiddlewareFunc,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

export class ErrorHandler extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// ErrorHandler - Middleware
export const ErrorMiddleware: MiddlewareFunc = (next) =>
  async (c) => {
    try {
      await next(c);
    } catch (err) {
      const error = err as ErrorHandler;
      c.response.status = error.status || 500;
      c.response.body = error.message;
    }
  };
