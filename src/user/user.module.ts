import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from 'src/utils/local.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [PrismaModule,],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
})
export class UserModule {}
