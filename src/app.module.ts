import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './common/bcrypt_module/bcrypt.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [UserModule, AuthModule, BcryptModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
