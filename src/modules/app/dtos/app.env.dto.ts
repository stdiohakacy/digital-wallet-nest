import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ENUM_APP_ENVIRONMENT, ENUM_APP_TIMEZONE } from '../enums/app.enum';

export class AppEnvDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  APP_NAME: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsEnum(ENUM_APP_ENVIRONMENT)
  APP_ENV: ENUM_APP_ENVIRONMENT;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_APP_TIMEZONE)
  APP_TIMEZONE: ENUM_APP_TIMEZONE;

  @IsNotEmpty()
  @IsString()
  HOME_NAME: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  HOME_URL: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  HTTP_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  HTTP_PORT: number;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  DEBUG_ENABLE: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  DEBUG_LEVEL: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  MIDDLEWARE_CORS_ORIGIN: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  URL_VERSIONING_ENABLE: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  URL_VERSION: number;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  DATABASE_DEBUG: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_JWT_AUDIENCE: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_JWT_ISSUER: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_JWT_ACCESS_TOKEN_EXPIRED: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_JWT_REFRESH_TOKEN_EXPIRED: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: string;
}
