import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { isCelebrateError, } from 'celebrate'

interface ValidationError extends Error {
  details: Map<string, string>;
}

const errorMiddleware = (err: ValidationError, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err)

  if (isCelebrateError(err)) {
    return response.status(400).json({
      status: 'validation-error',
      message: 'One or more parameter values are not valid'
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
export { errorMiddleware }
