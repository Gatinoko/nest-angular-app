import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Order extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number = 0;

  @Column({ allowNull: false })
  totalAmount: number;

  @Column({ defaultValue: 'pending' })
  status: 'confirmed' | 'pending' | 'fulfilled';

  // Link this order to a User ID
  @ForeignKey(() => User)
  @Column
  userId: number;

  // An Order belongs to one User
  @BelongsTo(() => User)
  user: User;
}
