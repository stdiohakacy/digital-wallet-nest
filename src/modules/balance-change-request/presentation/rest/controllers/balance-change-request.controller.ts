import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Err, match, Ok, Result } from 'oxide.ts';
import { ExceptionBase } from '@libs/exceptions';
import { CreateDepositRequestDto } from '../dtos/create-deposit-request.dto';
import {
  CreateDepositRequestCommand,
  CreateDepositRequestCommandProps,
} from '@modules/balance-change-request/application/ports/inbound/commands/create-deposit-request.command';
import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { DomainToRestErrorMapper } from '../../mappers/error-response.mapper';

@Controller('balance-change-requests')
export class BalanceChangeRequestController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/deposit')
  async createDepositRequest(@Body() body: CreateDepositRequestDto) {
    const commandProps = plainToInstance(
      CreateDepositRequestCommandProps,
      body,
    );

    const result: Result<
      UniqueEntityID<string>,
      ExceptionBase
    > = await this.commandBus.execute(
      new CreateDepositRequestCommand(commandProps),
    );

    return match(result, {
      Ok: (id: UniqueEntityID<string>) => {
        return id;
      },
      Err: (error: Error) => {
        throw DomainToRestErrorMapper.map(error);
      },
    });
  }
}
