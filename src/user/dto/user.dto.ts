import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userId: number;

  @IsString()
  email: string;

  @IsString()
  location: string;

  @IsString()
  password: string;
}
