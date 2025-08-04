import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { RequestType } from '@modules/balance-change-request/domain/enums/request-type.enum';
import { Money } from '@modules/shared/vo/money.vo';
import { PaymentMethodDto } from '../rest/dtos/payment-method.dto';
import { PaymentMethod } from '@modules/balance-change-request/domain/enums/payment-method.enum';
import { CreateDepositRequestCommandProps } from '@modules/balance-change-request/application/ports/inbound/commands/create-deposit-request.command';

export class BalanceChangeRequestMapper {
  private mapPaymentMethod(method: string) {
    switch (method) {
      case PaymentMethodDto.BANK_TRANSFER:
        return PaymentMethod.BANK_TRANSFER;
      case PaymentMethodDto.CREDIT_CARD:
        return PaymentMethod.CREDIT_CARD;
      case PaymentMethodDto.E_WALLET:
        return PaymentMethod.E_WALLET;
      case PaymentMethodDto.QR_CODE:
        return PaymentMethod.QR_CODE;
    }
  }

  static toAggregate(
    commandProps: CreateDepositRequestCommandProps,
    userId: string,
  ): BalanceChangeRequest {
    return BalanceChangeRequest.create({
      userId,
      type: RequestType.DEPOSIT,
      amount: new Money({
        value: commandProps.amount,
        currency: commandProps.currency,
      }),
      method: this.prototype.mapPaymentMethod(commandProps.method),
      remarks: commandProps.remarks,
    });
  }

  static toResponse(
    request: BalanceChangeRequest | BalanceChangeRequest[],
  ): any {
    if (Array.isArray(request)) {
      return request.map((req) => this.toResponse(req));
    }

    return {
      id: request.id.getValue(),
      userId: request.getProps().userId,
      type: request.getProps().type,
      amount: request.getProps().amount.value,
      currency: request.getProps().amount.currency,
      method: request.getProps().method,
      remarks: request.getProps().remarks,
      status: request.getProps().status,
      createdAt: request.getProps().createdAt,
      approvedAt: request.getProps().approvedAt,
      rejectedAt: request.getProps().rejectedAt,
      processedAt: request.getProps().processedAt,
    };
  }
}
