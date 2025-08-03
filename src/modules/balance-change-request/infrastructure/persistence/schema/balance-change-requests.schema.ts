import { BASE_SCHEMA } from '../../../../../libs/infrastructure/persistence/typeorm/schema/base.schema';

export const BALANCE_CHANGE_REQUEST_SCHEMA = {
  TABLE_NAME: 'balance_change_requests',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    USER_ID: 'user_id',
    TYPE: 'type',
    STATUS: 'status',
    AMOUNT_VALUE: 'amount_value',
    AMOUNT_CURRENCY: 'amount_currency',
    METHOD: 'method',
    REMARKS: 'remarks',
    APPROVED_AT: 'approved_at',
    REJECTED_AT: 'rejected_at',
    PROCESSED_AT: 'processed_at',
    REASON: 'reason',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
