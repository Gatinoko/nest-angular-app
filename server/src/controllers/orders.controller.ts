import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/create-order.dto';
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
}
