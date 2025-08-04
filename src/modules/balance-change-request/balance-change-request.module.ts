import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [InfrastructureModule, PresentationModule, ApplicationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BalanceChangeRequestModule {}
