import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response , Request } from 'express'



@Catch(HttpException)
// eslint-disable-next-line prettier/prettier
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus();
    const request  = ctx.getRequest<Request>()
    const exceptionRespone = exception.getResponse();
    const error = typeof response === 'string' ? { message: exceptionRespone } : (exceptionRespone as object)
    

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url

    });


  }
}
