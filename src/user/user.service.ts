import { Injectable } from '@nestjs/common';
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
        name: userData.name,
        location: userData.location
      }
      const user = this.prismaService.user.create({
        data: {
          ...userDataObject
        }
      })
      return user   
    } catch (e) {
      console.log(e)
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
    }
}
}
