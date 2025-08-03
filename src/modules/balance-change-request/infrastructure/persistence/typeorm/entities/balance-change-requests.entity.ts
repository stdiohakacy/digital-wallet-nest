import { Column, Entity } from 'typeorm';
import { BALANCE_CHANGE_REQUEST_SCHEMA } from '../../schema/balance-change-requests.schema';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';

@Entity(BALANCE_CHANGE_REQUEST_SCHEMA.TABLE_NAME)
export class BalanceChangeRequestEntity extends BaseOrmEntity {
  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.USER_ID,
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.TYPE,
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  type: string;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.STATUS,
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  status: string;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.AMOUNT_VALUE,
    type: 'numeric',
    nullable: false,
  })
  amountValue: number;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.AMOUNT_CURRENCY,
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  amountCurrency: string;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.METHOD,
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  method: string;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.REMARKS,
    type: 'text',
    nullable: true,
  })
  remarks?: string;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.APPROVED_AT,
    type: 'timestamp',
    nullable: true,
  })
  approvedAt?: Date;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.REJECTED_AT,
    type: 'timestamp',
    nullable: true,
  })
  rejectedAt?: Date;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.PROCESSED_AT,
    type: 'timestamp',
    nullable: true,
  })
  processedAt?: Date;

  @Column({
    name: BALANCE_CHANGE_REQUEST_SCHEMA.COLUMNS.REASON,
    type: 'text',
    nullable: true,
  })
  reason?: string;
}
