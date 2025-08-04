import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDepositRequestCommand } from '../create-deposit-request.command';
import {
  BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
  BalanceChangeRequestRepositoryPort,
} from '../../../outbound/balance-change-request.port';
import { CreateDepositRequestMapper } from '@modules/balance-change-request/presentation/mappers/create-deposit-request.mapper';
import { Ok, Result } from 'oxide.ts';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { ExceptionBase } from '@libs/exceptions';

@CommandHandler(CreateDepositRequestCommand)
export class CreateDepositRequestHandler
  implements
    ICommandHandler<
      CreateDepositRequestCommand,
      Result<UniqueEntityID<string>, ExceptionBase>
    >
{
  constructor(
    @Inject(BALANCE_CHANGE_REQUEST_REPOSITORY_PORT)
    private readonly balanceChangeRequestRepositoryPort: BalanceChangeRequestRepositoryPort,
  ) {}

  async execute(
    command: CreateDepositRequestCommand,
  ): Promise<Result<UniqueEntityID<string>, ExceptionBase>> {
    const { props } = command;

    const depositRequest = CreateDepositRequestMapper.toAggregate(
      props,
      '513af0c9-79c6-4c00-a525-008a6adfda3b',
    );

    const resultOrError =
      await this.balanceChangeRequestRepositoryPort.insert(depositRequest);
    if (resultOrError.isErr()) return resultOrError;

    return Ok<UniqueEntityID<string>>(depositRequest.id);
  }
}
