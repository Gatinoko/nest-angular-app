import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { User } from 'src/models/user.model';
import { FindOneUserParams } from 'src/params/find-one-user.params';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // GET /users/:id
  @Get(':id')
  async findOne(@Param() params: FindOneUserParams): Promise<User> {
    const user = await this.usersService.findOne(params.id);
    if (!user)
      throw new NotFoundException(`User with id ${params.id} not found.`);
    return user;
  }

  // POST /users
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
  // POST /users/login
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      /**
       * In a real application, a JWT/Auth token would be generated here and returned in the response.
       * For this simple validation, I'm returning a mock token alongside the user data.
       */

      const user = await this.usersService.validateUser(loginUserDto);
      const MOCK_TOKEN = 'MOCK-TOKEN';
      const response = {
        accessToken: MOCK_TOKEN,
        user: user,
      };
      return response;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
