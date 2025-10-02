import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from 'src/services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /orders
  @Post()
  async create(
    @Body('userId') userId: number,
    @Body('totalAmount') totalAmount: number,
  ) {
    // In a real app, userId would likely come from an authentication guard
    return this.ordersService.create(userId, totalAmount);
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
