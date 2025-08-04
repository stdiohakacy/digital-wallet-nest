import { BalanceChangeRequestModule } from '@modules/balance-change-request/balance-change-request.module';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule, BalanceChangeRequestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
