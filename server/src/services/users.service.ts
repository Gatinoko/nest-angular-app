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

  /**
   * Creates a new user object.
   * @param userData The information required for creating a new user.
   * @returns Created user information if successful.
   */
  async create(userData: CreateUserDto): Promise<User> {
  /**
   * Finds all registered users.
   * @returns Array of user objects if successful.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  /**
   * Finds a user by id.
   * @param id User id.
   * @returns User object if successful.
   */
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
