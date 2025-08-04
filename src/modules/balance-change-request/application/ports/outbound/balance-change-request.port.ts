import { BaseRepositoryPort } from '@libs/infrastructure/persistence/typeorm/repository/base.repository.port';
import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';

export const BALANCE_CHANGE_REQUEST_REPOSITORY_PORT = Symbol(
  'BALANCE_CHANGE_REQUEST_REPOSITORY_PORT',
);
export interface BalanceChangeRequestRepositoryPort
  extends BaseRepositoryPort<BalanceChangeRequest> {}
