import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { RoleDto } from './role.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: RoleDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}
