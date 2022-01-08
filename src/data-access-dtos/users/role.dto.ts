import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @IsNotEmpty()
  name: string;
}
