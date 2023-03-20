import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from 'src/common/bcrypt_module/bcrypt.module';
import { BcryptService } from 'src/common/bcrypt_module/bcrypt.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { LocalStrategy } from 'src/utils/local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [PrismaModule, BcryptModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '220d' },
  }),],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule { }
