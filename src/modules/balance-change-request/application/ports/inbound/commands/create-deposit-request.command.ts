import { ICommand } from '@nestjs/cqrs';

export class CreateDepositRequestCommandProps {
  userId: string;
  amount: number;
  currency: string;
  method: string;
  remarks?: string;
}

export class CreateDepositRequestCommand implements ICommand {
  constructor(public readonly props: CreateDepositRequestCommandProps) {}
}
