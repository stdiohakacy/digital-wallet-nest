import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceChangeRequestEntity } from './persistence/typeorm/entities/balance-change-requests.entity';
import { BALANCE_CHANGE_REQUEST_REPOSITORY_PORT } from '../application/ports/outbound/balance-change-request.port';
import { BalanceChangeRequestMapper } from './mappers/balance-change-request.mapper';
import { BalanceChangeRequestRepositoryAdapter } from './persistence/typeorm/repository/balance-change-request.repository.adapter';

const providers = [
  BalanceChangeRequestMapper,
  {
    provide: BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
    useClass: BalanceChangeRequestRepositoryAdapter,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([BalanceChangeRequestEntity])],
  providers,
  exports: [...providers],
})
export class InfrastructureModule {}
