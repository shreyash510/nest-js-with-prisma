import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {

  constructor(private prismaService : PrismaService) {}


  getHello(): string {
    return 'Hello World!';
  }

  async getAllUser(){
    return this.prismaService.user.findMany();
  }

  async createUser(){
    return 'user created'
  } 
}
