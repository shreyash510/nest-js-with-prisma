import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/user.dto'

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }


  getHello(): string {
    return 'Hello World!';
  }

  async getAllUser() {
    return this.prismaService.user.findMany();
  }

  async createUser(userData: CreateUserDto) {
    try {
      const userDataObject = {
        email: userData.email,
        location: userData.location,
        password : userData.password
      }
      const user = this.prismaService.user.create({
        data: {
          ...userDataObject
        }
      })
      return user   
    } catch (e) {
      console.log(e)
      throw new HttpException({ msg: 'USER CREATION FAILED!' }, HttpStatus.FORBIDDEN);
    }
  }

  async getUserById(userId : number){
    try{
      const user = this.prismaService.user.findUnique({
        where : {
          userId : 1 
        }
      })
      return user;
    }catch(e){
      console.log(e)
      throw new HttpException({ msg: 'FAILED!' }, HttpStatus.FORBIDDEN);
    }
  }

  async updateUser(userBody : CreateUserDto, userId : number){
      try{
        const user = this.prismaService.user.update({
          where : {
            userId : userId
          },
          data : {
            ...userBody
          },
        })
        return user;
      }catch(e){
        console.log(e)
        throw new HttpException({ msg: 'FAILED!' }, HttpStatus.FORBIDDEN);
      }
  }

  async deleteUser( userId : number){
    try{
      const user = this.prismaService.user.delete({
        where : {
          userId : userId
        },
      })
      return user;
    }catch(e){
      console.log(e)
      throw new HttpException({ msg: 'FAILED!' }, HttpStatus.FORBIDDEN);
    }
}
 
  async validateUserLocal(username: string, password : string){
    try{
      const user = await this.prismaService.user.findUnique({
        where : {
          email : username
        }
      })
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    catch(e){
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

