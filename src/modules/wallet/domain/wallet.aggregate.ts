import { BaseAggregateRoot } from '../../../libs/domain';
import { UniqueEntityID } from '../../../libs/domain/unique-entity-id';
import { ArgumentNotProvidedException } from '../../../libs/exceptions';
import { Money } from '../../shared/vo/money.vo';
import { LedgerEntryType } from './enums/ledger-entry.enum';
import { WalletDecreasedDomainEvent } from './events/wallet-decreased.event';
import { WalletIncreasedDomainEvent } from './events/wallet-increased.event';
import { LedgerEntry } from './ledger-entry.vo';

interface WalletProps {
  userId: string;
  balance: Money;
  ledgers: LedgerEntry[];
}

export class Wallet extends BaseAggregateRoot<WalletProps> {
  constructor(props: {
    id: UniqueEntityID<string>;
    props: WalletProps;
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

    if (!this.props.balance) {
      throw new ArgumentNotProvidedException('balance is required');
    }

    if (!Array.isArray(this.props.ledgers)) {
      throw new ArgumentNotProvidedException('ledgers must be an array');
    }
  }

  public get balance(): Money {
    return this.props.balance;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get ledgers(): LedgerEntry[] {
    return this.props.ledgers;
  }

  public increase(amount: Money, sourceRef: string): void {
    this.props.balance = this.props.balance.add(amount);
    this.props.ledgers.push(
      new LedgerEntry({
        type: LedgerEntryType.DEPOSIT,
        amount,
        balanceAfter: this.props.balance,
        timestamp: new Date(),
        sourceRef: new UniqueEntityID<string>(sourceRef),
        remark: 'Increase operation',
      }),
    );

    this.markUpdated();

    this.addEvent(
      new WalletIncreasedDomainEvent({
        eventName: 'WalletIncreased',
        amount,
        balanceAfter: this.props.balance,
        sourceRefId: sourceRef,
        increasedAt: new Date(),
        aggregateId: this.id.getValue(),
        version: 1,
        occurredAt: new Date(),
      }),
    );
  }

  public decrease(amount: Money, sourceRef: string): void {
    this.props.balance = this.props.balance.subtract(amount);
    this.props.ledgers.push(
      new LedgerEntry({
        type: LedgerEntryType.WITHDRAWAL,
        amount,
        balanceAfter: this.props.balance,
        timestamp: new Date(),
        sourceRef: new UniqueEntityID<string>(sourceRef),
        remark: 'Decrease operation',
      }),
    );

    this.markUpdated();

    this.addEvent(
      new WalletDecreasedDomainEvent({
        eventName: 'WalletDecreased',
        amount,
        balanceAfter: this.props.balance,
        sourceRefId: sourceRef,
        decreasedAt: new Date(),
        aggregateId: this.id.getValue(),
        version: 1,
        occurredAt: new Date(),
      }),
    );
  }
}
