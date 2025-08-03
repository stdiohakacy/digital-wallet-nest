import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerOptionModule } from './logger/logger.option.module';
import { LoggerOptionService } from './logger/services/logger.option.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from 'src/configs';
import { CacheModule, CacheOptions } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    DatabaseModule,
    PinoLoggerModule.forRootAsync({
      imports: [LoggerOptionModule],
      inject: [LoggerOptionService],
      useFactory: async (loggerOptionService: LoggerOptionService) => {
        return loggerOptionService.createOptions();
      },
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<CacheOptions> => ({
        max: configService.get<number>('redis.cached.max'),
        ttl: configService.get<number>('redis.cached.ttl'),
        stores: [
          new KeyvRedis({
            socket: {
              host: configService.get<string>('redis.cached.host'),
              port: configService.get<number>('redis.cached.port'),
              tls: configService.get<boolean>('redis.cached.tls'),
            },
            username: configService.get<string>('redis.cached.username'),
            password: configService.get<string>('redis.cached.password'),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    HelperModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
