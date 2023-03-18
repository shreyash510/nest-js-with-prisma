import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get( )
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('getAllUser')
  async getAllTodos() {
    return this.userService.getAllUser();
  }

  @Post('create')
  async createUser(){
    return this.userService.createUser();
  }

}
