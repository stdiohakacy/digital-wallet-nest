import { ExceptionBase, INTERNAL_SERVER_ERROR } from '@libs/exceptions';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

type RestExceptionHandler = (error: ExceptionBase) => HttpException;

function buildHttpErrorBody(
  error: ExceptionBase,
  code: string,
): Record<string, any> {
  return {
    message: error.message,
    errorCode: code,
  };
}

export class DomainToRestErrorMapper {
  private static readonly errorMap = new Map<Function, RestExceptionHandler>(
    [],
  );

  static map(error: Error): HttpException {
    for (const [ErrorClass, handler] of this.errorMap.entries()) {
      if (error instanceof ErrorClass) {
        return handler(error as ExceptionBase);
      }
    }

    const fallbackBody = {
      message: error.message || 'Internal server error',
      errorCode: INTERNAL_SERVER_ERROR,
    };

    return new InternalServerErrorException(fallbackBody);
  }
}
