import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(userData: any): Promise<User> {
    return this.userModel.create(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new Error(`User with id ${id} not found`);
    return user;
  }
}
