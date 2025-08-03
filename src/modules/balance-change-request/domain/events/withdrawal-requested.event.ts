import { Money } from 'src/modules/shared/vo/money.vo';
import { BaseDomainEvent, DomainEventProps } from '../../../../libs/domain';
import { PaymentMethod } from '../enums/payment-method.enum';

export class WithdrawalRequestedDomainEvent extends BaseDomainEvent {
  readonly requestId: string;
  readonly requestedBy: string;
  readonly amount: Money;
  readonly method: PaymentMethod;

  public get eventName(): string {
    return 'WithdrawalRequested';
  }

  constructor(props: DomainEventProps<WithdrawalRequestedDomainEvent>) {
    super(props);
    this.requestId = props.aggregateId;
    this.requestedBy = props.requestedBy;
    this.amount = props.amount;
    this.method = props.method;
  }
}
