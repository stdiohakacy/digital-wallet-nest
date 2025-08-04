import { IQuery } from '@nestjs/cqrs';

export class ViewRequestHistoryQueryProps {
  userId: string;
}

export class ViewRequestHistoryQuery implements IQuery {
  constructor(public readonly props: ViewRequestHistoryQueryProps) {}
}
