import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ViewRequestHistoryQuery } from '../view-request-history.query';
import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { Ok, Result } from 'oxide.ts';
import { ExceptionBase } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import {
  BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
  BalanceChangeRequestRepositoryPort,
} from '../../../outbound/balance-change-request.port';
import { BalanceChangeRequestMapper } from '@modules/balance-change-request/presentation/mappers/balance-change-request.mapper';

@QueryHandler(ViewRequestHistoryQuery)
export class ViewRequestHistoryHandler
  implements
    IQueryHandler<
      ViewRequestHistoryQuery,
      Result<BalanceChangeRequest[], ExceptionBase>
    >
{
  constructor(
    @Inject(BALANCE_CHANGE_REQUEST_REPOSITORY_PORT)
    private readonly balanceChangeRequestRepositoryPort: BalanceChangeRequestRepositoryPort,
  ) {}

  async execute(
    query: ViewRequestHistoryQuery,
  ): Promise<Result<BalanceChangeRequest[], ExceptionBase>> {
    const { props } = query;

    const resultOrError =
      await this.balanceChangeRequestRepositoryPort.findAll();
    if (resultOrError.isErr()) {
      return resultOrError;
    }

    const requests = resultOrError
      .unwrap()
      .filter((request) => request.getProps().userId === props.userId);

    return Ok(BalanceChangeRequestMapper.toResponse(requests));
  }
}
