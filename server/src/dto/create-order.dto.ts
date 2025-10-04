import { IsEnum, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from 'src/enums/order-status.enum';

export class CreateOrderDto {
  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly product: string;

  @IsNumber()
  readonly totalAmount: number;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
