import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { CreateDepositRequestDto } from '../rest/dtos/create-deposit-request.dto';
import { RequestType } from '@modules/balance-change-request/domain/enums/request-type.enum';
import { Money } from '@modules/shared/vo/money.vo';
import { PaymentMethodDto } from '../rest/dtos/payment-method.dto';
import { PaymentMethod } from '@modules/balance-change-request/domain/enums/payment-method.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateDepositRequestMapper {
  private mapPaymentMethod(method: PaymentMethodDto) {
    switch (method) {
      case PaymentMethodDto.BANK_TRANSFER:
        return PaymentMethod.BANK_TRANSFER;
      case PaymentMethodDto.CREDIT_CARD:
        return PaymentMethod.CREDIT_CARD;
      case PaymentMethodDto.E_WALLET:
        return PaymentMethod.E_WALLET;
    }
  }

  static toAggregate(
    dto: CreateDepositRequestDto,
    userId: string,
  ): BalanceChangeRequest {
    return BalanceChangeRequest.create({
      userId,
      type: RequestType.DEPOSIT,
      amount: new Money({ value: dto.amount, currency: dto.currency }),
      method: this.prototype.mapPaymentMethod(dto.method),
      remarks: dto.remarks,
    });
  }

  static toResponse() {}
}
