import { IsUUID } from 'class-validator';

export class ViewRequestHistoryDto {
  @IsUUID()
  userId: string;
}
