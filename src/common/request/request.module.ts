import {
  DynamicModule,
  HttpStatus,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { RequestTimeoutInterceptor } from './interceptors/request.timeout.interceptor';
import { RequestValidationException } from './exceptions/request.validation.exception';
import {
  DateGreaterThanConstraint,
  DateGreaterThanEqualConstraint,
} from './validations/request.date-greater-than.validation';
import {
  DateLessThanConstraint,
  DateLessThanEqualConstraint,
} from './validations/request.date-less-than.validation';
import {
  GreaterThanEqualOtherPropertyConstraint,
  GreaterThanOtherPropertyConstraint,
} from './validations/request.greater-than-other-property.validation';
import { IsPasswordConstraint } from './validations/request.is-password.validation';
import {
  LessThanEqualOtherPropertyConstraint,
  LessThanOtherPropertyConstraint,
} from './validations/request.less-than-other-property.validation';

@Module({})
export class RequestModule {
  static forRoot(): DynamicModule {
    return {
      module: RequestModule,
      controllers: [],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: RequestTimeoutInterceptor,
        },
        {
          provide: APP_PIPE,
          useFactory: () =>
            new ValidationPipe({
              transform: true,
              skipUndefinedProperties: true,
              forbidUnknownValues: true,
              errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
              exceptionFactory: async (errors: ValidationError[]) =>
                new RequestValidationException(errors),
            }),
        },
        DateGreaterThanEqualConstraint,
        DateGreaterThanConstraint,
        DateLessThanEqualConstraint,
        DateLessThanConstraint,
        GreaterThanEqualOtherPropertyConstraint,
        GreaterThanOtherPropertyConstraint,
        IsPasswordConstraint,
        LessThanEqualOtherPropertyConstraint,
        LessThanOtherPropertyConstraint,
      ],
      imports: [],
    };
  }
}
