import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateDepositRequestHandler } from './ports/inbound/commands/handlers/create-deposit-request.handler';

const queryHandlers = [CreateDepositRequestHandler];
const commandHandlers = [];
const useCases = [];
const eventHandlers = [];
const sagas = [];

const providers = [
  ...queryHandlers,
  ...commandHandlers,
  ...useCases,
  ...eventHandlers,
  ...sagas,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
