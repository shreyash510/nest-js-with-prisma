import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/utils/Guard';
import { CreateUserDto } from './dto/user.dto';
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

  @Get('getUserById/:id')
  async getUserById(@Param('id', ParseIntPipe) userId : number) {
    return this.userService.getUserById(userId);
  }

  @Post('create') 
  async createUser( @Body() userData : CreateUserDto){
    return this.userService.createUser(userData); 
  }

  @Put('update/:userId')
  async updateUser(@Body() userBody : CreateUserDto, @Param('userId', ParseIntPipe) userId : number){
    return this.userService.updateUser(userBody, userId);
  }

  @Delete('delete/:userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId : number){
    return this.userService.deleteUser(userId);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard) // localauthGuard reponsive
  async login(@Request() req: any) {
    return 'working'
    // return this.userService.loginWithCredentials(req.user);
  } 
}
