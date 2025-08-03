import { BaseAggregateRoot } from '../../../../libs/domain';
import { UniqueEntityID } from '../../../../libs/domain/unique-entity-id';
import { ArgumentNotProvidedException } from '../../../../libs/exceptions';
import { Money } from '../../../shared/vo/money.vo';
import { PaymentMethod } from '../enums/payment-method.enum';
import { RequestStatus } from '../enums/request-status.enum';
import { RequestType } from '../enums/request-type.enum';
import { DepositApprovedDomainEvent } from '../events/deposit-approved.event';
import { DepositRejectedDomainEvent } from '../events/deposit-rejected.event';

interface BalanceChangeRequestProps {
  userId: string;
  type: RequestType;
  amount: Money;
  method: PaymentMethod;
  status: RequestStatus;
  remarks?: string;
  createdAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
}

export class BalanceChangeRequest extends BaseAggregateRoot<BalanceChangeRequestProps> {
  constructor(props: {
    id: UniqueEntityID<string>;
    props: BalanceChangeRequestProps;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
  }) {
    super(props);
  }

  public validate(): void {
    if (!this.props.userId) {
      throw new ArgumentNotProvidedException('userId is required');
    }
    if (!this.props.amount) {
      throw new ArgumentNotProvidedException('amount is required');
    }
    if (!this.props.type) {
      throw new ArgumentNotProvidedException('type is required');
    }
    if (!this.props.method) {
      throw new ArgumentNotProvidedException('method is required');
    }
    if (!this.props.status) {
      throw new ArgumentNotProvidedException('status is required');
    }
    if (!this.props.createdAt) {
      throw new ArgumentNotProvidedException('createdAt is required');
    }
  }

  public getStatus(): RequestStatus {
    return this.props.status;
  }
  public getApprovedAt(): Date | undefined {
    return this.props.approvedAt;
  }
  public getRejectedAt(): Date | undefined {
    return this.props.rejectedAt;
  }

  public approve(): void {
    if (this.props.status !== RequestStatus.PENDING) {
      throw new ArgumentNotProvidedException(
        'Request must be pending to approve',
      );
    }

    this.props.status = RequestStatus.APPROVED;
    this.props.approvedAt = new Date();

    this.markUpdated();

    const event = new DepositApprovedDomainEvent({
      aggregateId: this.id.toString(),
      requestId: this.id.toString(),
      eventName: 'DepositApproved',
      version: 1,
      approvedBy: 'cornal-admin-uuid',
      approvedAt: this.props.approvedAt,
      occurredAt: new Date(),
    });

    this.addEvent(event);
  }

  public reject(): void {
    if (this.props.status !== RequestStatus.PENDING) {
      throw new ArgumentNotProvidedException(
        'Request must be pending to reject',
      );
    }

    this.props.status = RequestStatus.REJECTED;
    this.props.rejectedAt = new Date();

    const event = new DepositRejectedDomainEvent({
      aggregateId: this.id.toString(),
      requestId: this.id.toString(),
      eventName: 'DepositApproved',
      version: 1,
      rejectedBy: 'cornal-admin-uuid',
      rejectedAt: this.props.rejectedAt,
      occurredAt: new Date(),
    });

    this.addEvent(event);

    this.markUpdated();
  }

  public markAsProcessed(): void {
    if (this.props.status !== RequestStatus.PENDING) {
      throw new ArgumentNotProvidedException(
        'Request must be pending to process',
      );
    }
    this.props.status = RequestStatus.PROCESSED;
    this.markUpdated();
  }
}
