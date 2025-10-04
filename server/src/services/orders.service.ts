import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    return this.orderModel.create({ ...orderData });
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { userId },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [{ model: User }],
    });
    if (!order) throw new Error(`Order with id ${id} not found`);
    return order;
  }

  async update(id: number, updateData: UpdateOrderDto) {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found.`);

    const [affectedCount, affectedRows] = await this.orderModel.update(
      updateData,
      {
        where: { id },
        returning: true, // Returns updated records
      },
    );
    if (affectedCount === 0)
      throw new NotFoundException(`Order with ID ${id} could not be updated.`);

    return affectedRows[0];
  }

  async delete(id: number): Promise<void> {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found.`);
    await order.destroy();
  }
}
