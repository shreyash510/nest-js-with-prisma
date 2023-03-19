import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from 'src/utils/local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '220d' },
  }),],
  controllers: [UserController],
  providers: [UserService, LocalStrategy,],
})
export class UserModule { }
