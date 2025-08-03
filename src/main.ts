import { NestApplication, NestFactory } from '@nestjs/core';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/app/app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { useContainer, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AppEnvDto } from './modules/app/dtos/app.env.dto';
import { ENUM_APP_ENVIRONMENT } from './modules/app/enums/app.enum';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: false,
  });

  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.env');
  const timezone: string = configService.get<string>('app.timezone');
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>(
    'app.urlVersion.prefix',
  );
  const version: string = configService.get<string>('app.urlVersion.version');

  // enable
  const versionEnable: string = configService.get<string>(
    'app.urlVersion.enable',
  );

  const logger = new Logger('Product Catalog Service');
  process.env.NODE_ENV = env;
  process.env.TZ = timezone;

  // logger
  app.useLogger(app.get(PinoLogger));

  // Compression
  app.use(compression());

  // Global
  app.setGlobalPrefix(globalPrefix);

  // For Custom Validation
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Versioning
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }

  // Validate Env
  const classEnv = plainToInstance(AppEnvDto, process.env);
  const errors = await validate(classEnv);
  if (errors.length > 0) {
    logger.error('Environment variables validation failed');
    errors.forEach((error) => {
      logger.error(
        `- ${error.property}: ${Object.values(error.constraints).join(', ')}`,
      );
    });
    process.exit(1);
  }

  // Swagger
  // await swaggerInit(app);

  // Listen
  await app.listen(port, host);

  if (env === ENUM_APP_ENVIRONMENT.MIGRATION) {
    logger.log(`On migrate the schema`);

    await app.close();
    process.exit(0);
  }

  logger.log(`Http versioning is ${versionEnable}`);

  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');

  return;
}

bootstrap();
