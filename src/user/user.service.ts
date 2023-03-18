import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAllUser(){
    return 'Get All User';
  }

  async createUser(){
    return 'user created'
  } 
}
