import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/bcrypt_module/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/user.dto'

@Injectable()
export class UserService {

  constructor(
    private prismaService: PrismaService,
    private bcryptService: BcryptService
  ) { }


  getHello(): string {
    return 'Hello World!';
  }

  async getAllUser() {
    return this.prismaService.user.findMany();
  }

  async createUser(userData: CreateUserDto) {
    const hashPassword = await this.bcryptService.plainToHash(userData.password)
    try {
      const userDataObject = {

      }
      const user = this.prismaService.user.create({
        data: {
          email: userData.email,
          location: userData.location,
          password: hashPassword,
          role : 'USER'
        }
      })
      return user
    } catch (e) {
      console.log(e)
      throw new HttpException({ msg: 'USER CREATION FAILED!' }, HttpStatus.FORBIDDEN);
    }
  }

  async getUserById(userId: number) {
    try {
      const user = this.prismaService.user.findUnique({
        where: {
          userId: 1 
        } 
      })
      return user;
    } catch (e) {
      console.log(e)
      throw new HttpException({ msg: 'FAILED!' }, HttpStatus.FORBIDDEN);
    }
  }

  async updateUser(userBody: CreateUserDto, userId: number) {
    try {
      // const user = this.prismaService.user.update({
      //   where: {
      //     userId: userId
      //   },
      //   data: {
      //     ...userBody
      //   },
      // })
      // return user;
    } catch (e) {
      // console.log(e)
      // throw new HttpException({ msg: 'FAILED!' }, HttpStatus.FORBIDDEN);
    }
  }

  async deleteUser(userId: number) {
    try {
      const user = this.prismaService.user.delete({
        where: {
          userId: userId
        },
      })
      return user;
    } catch (e) {
      console.log(e)
      throw new HttpException({ msg: 'FAILED!' }, HttpStatus.FORBIDDEN);
    }
  }

  async validateUserLocal(username: string, password: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: username 
        }
      })
      if (user) {
        const compairPassword = await this.bcryptService.compareHash(password, user && user.password)
        if (compairPassword) {
          const { ...result } = user;
          return result
        }
      }
      return null;
    }
    catch (e) {
      console.log(e)
      return null
    }
  }

  // async validateUserLocal(){
  //   try{

  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

}

