import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UniqueConstraintError } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create({ ...userData });
    } catch (error) {
      // Returns custom error message for when the provided email is already registered
      if (error instanceof UniqueConstraintError) {
        const uniqueFieldError = error.errors.find(
          (e) => e.path === 'email' || e.validatorKey === 'not_unique',
        );

        if (uniqueFieldError)
          throw new ConflictException('Email is already registered.');
      }

      // If it's another type of error (e.g., connection, validation, etc.), re-throw it
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userModel.findByPk(id);
    if (!user) return null;
    return user;
  }
}
