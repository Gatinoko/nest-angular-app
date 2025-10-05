import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UniqueConstraintError } from 'sequelize';
import { LoginUserDto } from 'src/dto/login-user.dto';

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

  /**
   * Finds a user by email and securely validates the provided password.
   * @param userData The email and password provided by the user.
   * @returns The User object if credentials are valid.
   * @throws UnauthorizedException if credentials are invalid.
   */
  async validateUser(userData: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email: userData.email },
    });

    // If user isn't found
    if (!user) throw new UnauthorizedException('Invalid credentials.');

    const isPasswordMatching = userData.password === user.password;

    // If password is incorrect
    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials.');

    // Turns user into a plain object
    const safeUser = user.toJSON();
    return safeUser as User;
  }
}
