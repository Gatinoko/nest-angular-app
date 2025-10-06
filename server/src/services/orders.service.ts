import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { OrderNotFoundException } from 'src/exceptions/order-not-found.exception';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  /**
   * Creates a new order.
   * @param orderData The information required for creating a new order.
   * @return Created order information if successful.
   */
  async create(orderData: CreateOrderDto): Promise<Order> {
    return this.orderModel.create({ ...orderData });
  }

  /**
   * Finds all created orders.
   * @return Array of all created orders.
   */
  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  /**
   * Finds all created orders by a certain user.
   * @param userId Id of the user to be queried.
   * @return Array of the specified user's created orders if successful.
   */
  async findAllByUserId(userId: number): Promise<Order[]> {
    return this.orderModel.findAll({
      where: { userId },
    });
  }

  /**
   * Finds a specific order.
   * @param id Order id.
   * @return Order object if successful.
   * @throws OrderNotFoundException if a order with the provided id doesn't exist.
   */
  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [{ model: User }],
    });
    if (!order) throw new OrderNotFoundException();
    return order;
  }

  /**
   * Updates a specific order.
   * @param id Id of the order to be updated.
   * @param updateData Data to be used for update.
   * @return Updated order object if successful.
   * @throws OrderNotFoundException if provided order doesn't exist.
   */
  async update(id: number, updateData: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new OrderNotFoundException();

    const [affectedCount, affectedRows] = await this.orderModel.update(
      updateData,
      {
        where: { id },
        returning: true, // Returns updated records
      },
    );
    if (affectedCount === 0) throw new OrderNotFoundException();

    return affectedRows[0];
  }

  /**
   * Deletes a specific order.
   * @param id Id of the order to be deleted.
   */
  async delete(id: number): Promise<void> {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found.`);
    await order.destroy();
  }
}
