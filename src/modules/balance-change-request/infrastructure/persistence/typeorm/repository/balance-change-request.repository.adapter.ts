import { BaseRepositoryImpl } from '@libs/infrastructure/persistence/typeorm/repository/base.repository.impl';
import {
  BalanceChangeRequest,
  BalanceChangeRequestProps,
} from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { Injectable } from '@nestjs/common';
import { BalanceChangeRequestEntity } from '../entities/balance-change-requests.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceChangeRequestRepositoryPort } from '@modules/balance-change-request/application/ports/outbound/balance-change-request.port';
import { BalanceChangeRequestMapper } from '@modules/balance-change-request/infrastructure/mappers/balance-change-request.mapper';
import { Repository } from 'typeorm';
import { BALANCE_CHANGE_REQUEST_SCHEMA } from '../../schema/balance-change-requests.schema';

@Injectable()
export class BalanceChangeRequestRepositoryAdapter
  extends BaseRepositoryImpl<
    BalanceChangeRequestProps,
    BalanceChangeRequest,
    BalanceChangeRequestEntity
  >
  implements BalanceChangeRequestRepositoryPort
{
  constructor(
    @InjectRepository(BalanceChangeRequestEntity)
    public readonly balanceChangeRequestRepository: Repository<BalanceChangeRequestEntity>,
    public readonly balanceChangeRequestMapper: BalanceChangeRequestMapper,
  ) {
    super(
      balanceChangeRequestRepository,
      BALANCE_CHANGE_REQUEST_SCHEMA,
      balanceChangeRequestMapper,
    );
  }
}
