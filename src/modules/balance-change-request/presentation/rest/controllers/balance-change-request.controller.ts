import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { match, Result } from 'oxide.ts';
import { ExceptionBase } from '@libs/exceptions';
import { CreateDepositRequestDto } from '../dtos/create-deposit-request.dto';
import {
  CreateDepositRequestCommand,
  CreateDepositRequestCommandProps,
} from '@modules/balance-change-request/application/ports/inbound/commands/create-deposit-request.command';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { DomainToRestErrorMapper } from '../../mappers/error-response.mapper';
import {
  ViewRequestHistoryQuery,
  ViewRequestHistoryQueryProps,
} from '@modules/balance-change-request/application/ports/inbound/queries/view-request-history.query';

@Controller('balance-change-requests')
export class BalanceChangeRequestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/:user_id/history')
  async viewRequestHistory(@Param('user_id') userId: string) {
    const queryProps = plainToInstance(ViewRequestHistoryQueryProps, {
      userId,
    });
    const result = await this.queryBus.execute(
      new ViewRequestHistoryQuery(queryProps),
    );
    return match(result, {
      Ok: (history) => history,
      Err: (error: Error) => {
        throw DomainToRestErrorMapper.map(error);
      },
    });
  }

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
