import { Money } from 'src/modules/shared/vo/money.vo';
import { BaseDomainEvent, DomainEventProps } from '../../../../libs/domain';
import { PaymentMethod } from '../enums/payment-method.enum';

export class DepositRequestedDomainEvent extends BaseDomainEvent {
  readonly requestId: string;
  readonly requestedBy: string;
  readonly amount: Money;
  readonly method: PaymentMethod;

  public get eventName(): string {
    return 'DepositRequested';
  }

  constructor(props: DomainEventProps<DepositRequestedDomainEvent>) {
    super(props);
    this.requestId = props.aggregateId;
    this.requestedBy = props.requestedBy;
    this.amount = props.amount;
    this.method = props.method;
  }
}
