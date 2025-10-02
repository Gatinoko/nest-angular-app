import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly totalAmount: number;
}
