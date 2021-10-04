import { Context, MiddlewareFunc } from "https://deno.land/x/abc@v1.3.3/mod.ts";

export class ErrorHandler extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// LogHandler - Middleware
export const LogMiddleware: MiddlewareFunc = (next) =>
  async (c) => {
    const start = Date.now();
    const { method, url, proto } = c.request;
    await next(c);
    console.log(JSON.stringify(
      {
        time: Date(),
        method,
        url,
        proto,
        response_time: Date.now() - start + " millisecond",
        response_status: c.response.status,
      },
      null,
      "\t",
    ));
  };

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
