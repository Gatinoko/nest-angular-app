import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return 'hi!';
  }
}
