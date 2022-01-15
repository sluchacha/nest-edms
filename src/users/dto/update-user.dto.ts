// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({ example: 'johndoe@gmail.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;
}
