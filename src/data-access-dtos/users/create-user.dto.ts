import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { toUpper } from 'lodash';
import { Role } from './role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  @IsNotEmpty()
  password_confirm: string;

  @ApiProperty({ enum: Role, example: Role.Admin })
  @IsEnum(Role, { message: `Role must be one of these ${Object.keys(Role)}` })
  @Transform(({ value }) => toUpper(value))
  @IsNotEmpty()
  role: Role;
}
