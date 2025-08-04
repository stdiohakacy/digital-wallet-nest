import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentMethodDto } from './payment-method.dto';

export class CreateDepositRequestDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsEnum(PaymentMethodDto)
  method: PaymentMethodDto;

  @IsOptional()
  @IsString()
  remarks?: string;
}
