import { IsEnum, IsNumber } from 'class-validator';
import { OrderStatus } from 'src/enums/order-status.enum';

export class CreateOrderDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly totalAmount: number;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
