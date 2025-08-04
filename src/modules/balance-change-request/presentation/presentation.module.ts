import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BalanceChangeRequestController } from './rest/controllers/balance-change-request.controller';
import { ApplicationModule } from '../application/application.module';

const grpcControllers = [];
const restControllers = [BalanceChangeRequestController];
const graphqlResolvers = [];

const controllers = [...grpcControllers, ...restControllers];
const providers = [...graphqlResolvers];

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers,
  providers,
  exports: [...providers],
})
export class PresentationModule {}
