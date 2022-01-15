import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsMongoId,
  IsString,
  IsDateString,
  IsEmail,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Role } from '../enums';

@Exclude()
export class UserSnippetDto {
  @ApiProperty()
  @Expose()
  @IsMongoId()
  readonly id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly fullName: string;

  @ApiProperty()
  @Expose()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @Expose()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({ type: Boolean })
  @Expose()
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty()
  @Expose()
  @IsDateString()
  readonly lastAccessedOn: string;
}
