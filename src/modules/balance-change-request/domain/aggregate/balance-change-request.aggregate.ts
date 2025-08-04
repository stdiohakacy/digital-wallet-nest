import { randomUUID } from 'crypto';
import { BaseAggregateRoot } from '../../../../libs/domain';
import { UniqueEntityID } from '../../../../libs/domain/unique-entity-id';
import { ArgumentNotProvidedException } from '../../../../libs/exceptions';
import { Money } from '../../../shared/vo/money.vo';
import { PaymentMethod } from '../enums/payment-method.enum';
import { RequestStatus } from '../enums/request-status.enum';
import { RequestType } from '../enums/request-type.enum';
import { DepositApprovedDomainEvent } from '../events/deposit-approved.event';
import { DepositRejectedDomainEvent } from '../events/deposit-rejected.event';

interface CreateBalanceChangeRequestProps {
  userId: string;
  type: RequestType;
  amount: Money;
  method: PaymentMethod;
  remarks?: string;
}

export interface BalanceChangeRequestProps
  extends CreateBalanceChangeRequestProps {
  status: RequestStatus;
  createdAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  processedAt?: Date;
}

export class BalanceChangeRequest extends BaseAggregateRoot<BalanceChangeRequestProps> {
  static create(
    props: CreateBalanceChangeRequestProps,
    id?: UniqueEntityID<string>,
  ): BalanceChangeRequest {
    const now = new Date();

    const balanceChangeRequestProps: BalanceChangeRequestProps = {
      ...props,
      status: RequestStatus.PENDING,
      createdAt: now,
      approvedAt: undefined,
      rejectedAt: undefined,
    };

    const request = new BalanceChangeRequest({
      id: id ?? new UniqueEntityID(randomUUID()),
      props: balanceChangeRequestProps,
      createdAt: now,
      updatedAt: now,
    });
    request.validate();
    return request;
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
      eventName: 'DepositRejected',
      version: 1,
      rejectedBy: 'cornal-admin-uuid',
      rejectedAt: this.props.rejectedAt,
      occurredAt: new Date(),
    });

    this.addEvent(event);

    this.markUpdated();
  }

  public markAsProcessed(): void {
    if (this.props.status !== RequestStatus.APPROVED) {
      throw new ArgumentNotProvidedException(
        'Request must be pending to process',
      );
    }
    this.props.status = RequestStatus.PROCESSED;
    this.props.processedAt = new Date();
    this.markUpdated();
  }
}
