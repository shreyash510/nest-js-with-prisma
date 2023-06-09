import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { BcryptModule } from 'src/common/bcrypt_module/bcrypt.module';

@Module({
  imports: [UserModule, PrismaModule, PassportModule, BcryptModule],
  providers: [AuthService, UserService]
})
export class AuthModule {}




 