import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceChangeRequestEntity } from './persistence/typeorm/entities/balance-change-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceChangeRequestEntity])],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
