import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { OrderStatus } from 'src/enums/order-status.enum';

@Table
export class Order extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  product: string;

  @Column({ allowNull: false })
  totalAmount: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(OrderStatus),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: OrderStatus;

  // Link this order to a User ID
  @ForeignKey(() => User)
  @Column
  userId: number;

  // An Order belongs to one User
  @BelongsTo(() => User)
  user: User;
}
