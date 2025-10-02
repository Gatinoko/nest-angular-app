import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
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
    return this.usersService.create(createUserDto);
  }
}
