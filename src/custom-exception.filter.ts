import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from './logger/logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Unknown error handled in CustomExceptionFilter';
    let stack = 'Unknown error stack';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    const json = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.loggerService.error(
      `[CustomExceptionFilter] ${JSON.stringify(json)}`,
      stack,
    );

    response.status(status).json(json);
  }
}
