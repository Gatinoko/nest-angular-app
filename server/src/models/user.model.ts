import { validate } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRole } from 'src/enums/user-role.enum';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number = 0;

  @Column({
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  email: string;

  @Column({
    allowNull: false,
    validate: {
      noEmpty: true,
    },
  })
  firstName: string;

  @Column({
    allowNull: false,
    validate: {
      noEmpty: true,
    },
  })
  lastName: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserRole),
    allowNull: false,
    defaultValue: 'user',
  })
  role: UserRole;

  @Column({
    allowNull: false,
    validate: {
      noEmpty: true,
    },
  })
  password: string;
}
