import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private prismaService: PrismaService
        ) {}

    async validateUser(username: string, password: string): Promise<any> {
        // const user = await this.prismaService.user.findUnique({
        //   where : {
        //     email : username
        //   }
        // })
    
    //   if (user && user.password === password) {
    //     const { password, ...result } = user;
    //     return result;
    //   }
      return null;
    }

  
}
