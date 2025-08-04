import { Injectable } from '@nestjs/common';
import { MapperInterface } from '@libs/domain/mapper.interface';
import {
  BalanceChangeRequest,
  BalanceChangeRequestProps,
} from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { BalanceChangeRequestEntity } from '../persistence/typeorm/entities/balance-change-requests.entity';
import { RequestType } from '@modules/balance-change-request/domain/enums/request-type.enum';
import { Money } from '@modules/shared/vo/money.vo';
import { PaymentMethod } from '@modules/balance-change-request/domain/enums/payment-method.enum';

@Injectable()
export class BalanceChangeRequestMapper
  implements MapperInterface<BalanceChangeRequest, BalanceChangeRequestEntity>
{
  toDomain(entity: BalanceChangeRequestEntity): BalanceChangeRequest {
    return BalanceChangeRequest.create({
      userId: entity.userId,
      type: entity.type as RequestType,
      amount: new Money({
        value: Number(entity.amountValue),
        currency: entity.amountCurrency,
      }),
      method: entity.method as PaymentMethod,
      remarks: entity.remarks,
    });
  }

  toPersistence(aggregate: BalanceChangeRequest): BalanceChangeRequestEntity {
    const props: BalanceChangeRequestProps = aggregate['props'];
    const entity = new BalanceChangeRequestEntity();
    entity.id = aggregate.id.getValue();
    entity.userId = props.userId;
    entity.type = props.type;
    entity.status = props.status;
    entity.amountValue = props.amount.value;
    entity.amountCurrency = props.amount.currency;
    entity.method = props.method;
    entity.remarks = props.remarks;
    entity.approvedAt = props.approvedAt;
    entity.rejectedAt = props.rejectedAt;
    entity.processedAt = props.processedAt;
    entity.createdDate = props.createdAt;
    entity.updatedDate = props.createdAt;
    entity.createdUserId = props.userId;
    entity.updatedUserId = props.userId;
    entity.deletedDate = undefined;
    entity.deletedUserId = undefined;
    return entity;
  }
}
