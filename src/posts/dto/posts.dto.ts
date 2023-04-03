import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

}
