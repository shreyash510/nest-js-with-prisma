import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './common/bcrypt_module/bcrypt.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, BcryptModule, PrismaModule], // This is used to import all modules 
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
