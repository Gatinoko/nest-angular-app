import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { Order } from 'src/models/order.model';
import { OrdersService } from 'src/services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /orders
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create({ ...createOrderDto });
  }

  // GET /orders/user/:userId
  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: number) {
    return this.ordersService.findAllByUserId(userId);
  }

  // GET /orders/:id
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  // GET /orders
  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  // PUT /orders/:id
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  // DELETE /orders/:id
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.ordersService.delete(id);
  }
}
