import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(8)
  password: string;
}
