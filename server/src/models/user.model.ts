import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number = 0;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  firstName: string;

  @Column
  lastName: string;
}
