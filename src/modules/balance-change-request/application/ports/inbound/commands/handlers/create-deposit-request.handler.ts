import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDepositRequestCommand } from '../create-deposit-request.command';
import { Inject } from '@nestjs/common';
import {
  BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
  BalanceChangeRequestRepositoryPort,
} from '../../../outbound/balance-change-request.port';
import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';

@CommandHandler(CreateDepositRequestCommand)
export class CreateDepositRequestHandler
  implements ICommandHandler<CreateDepositRequestCommand>
{
  // constructor(
  //   @Inject(BALANCE_CHANGE_REQUEST_REPOSITORY_PORT)
  //   private readonly balanceChangeRequestRepositoryPort: BalanceChangeRequestRepositoryPort,
  // ) {}

  async execute(command: CreateDepositRequestCommand): Promise<boolean> {
    const { props } = command;
    const { userId, amount, currency, method, remarks } = props;
    console.log({ userId, amount, currency, method, remarks });
    return true;
    // const depositRequest = BalanceChangeRequest.create({
    //   userId,
    //   amount,
    //   currency,
    //   method,
    //   remarks,
    // });
  }
}
