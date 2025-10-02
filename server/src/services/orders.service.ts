import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(userId: number, totalAmount: number): Promise<Order> {
    return this.orderModel.create({ userId, totalAmount });
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { userId },
      // Include the associated User data using the 'include' option
      include: [{ model: User }],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [{ model: User }],
    });
    if (!order) throw new Error(`Order with id ${id} not found`);
    return order;
  }
}
