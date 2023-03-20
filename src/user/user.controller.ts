import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, LocalAuthGuard } from 'src/utils/Guard';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AdminRoleGuard } from 'src/auth/guard/admin-role.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/guard/roles.decorator';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtService,
    ) {}

  @Get( )
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('getAllUser')
  @UseGuards(RolesGuard)
  @Roles("admin", "user")
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
  // useGuard is like a middleware to used for authentication, authorization, or other custom criteria.
  @UseGuards(LocalAuthGuard) // localauthGuard reponsiv
     loginWithCredentials(@Request() req : any) {
      // console.log('loginWithCredentials',req)
      const user = req.user
      try {
        const payload = {
          username: user.email,
          userId: user.userId,
          role : user.role
        };
  
        return {
          access_token: this.jwtTokenService.sign(payload),
          userId: user.userId,
        };
      } catch (error) {
        console.log(error)
        throw new HttpException({ msg: 'JWT_ERROR' }, HttpStatus.FORBIDDEN);
      }
    }

    @Get('simple')
    @UseGuards(JwtAuthGuard)
    simple(){
    return 'simple api'
  }

}
