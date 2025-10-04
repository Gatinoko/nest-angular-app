import { IsEnum, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from 'src/enums/order-status.enum';

export class UpdateOrderDto {
  @IsString()
  readonly product: string;

  @IsNumber()
  readonly totalAmount: number;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
