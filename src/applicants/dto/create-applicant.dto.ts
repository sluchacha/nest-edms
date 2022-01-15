import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender, MaritalStatus } from '../enums';
import { RegionDto } from './region.dto';

export class CreateApplicantDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    example: '24011150',
  })
  @IsString()
  @IsNotEmpty()
  readonly nationalId: string;

  @ApiProperty({
    example: '2022-01-04',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly dob: string;

  @ApiProperty({ enum: Gender, example: Gender.Male })
  @IsEnum(Gender, {
    message: `Gender must be one of these ${Object.keys(Gender)}`,
  })
  @IsNotEmpty()
  readonly gender: string;

  @ApiProperty({ enum: MaritalStatus, example: MaritalStatus.Single })
  @IsEnum(MaritalStatus, {
    message: `Marital status must be one of these ${Object.keys(
      MaritalStatus,
    )}`,
  })
  @IsNotEmpty()
  readonly maritalStatus: string;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['0712659790', '0770511643'],
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsArray()
  readonly telephone: string[];

  @ApiProperty({ type: RegionDto })
  @IsOptional()
  @Type(() => RegionDto)
  readonly region: RegionDto;
}
