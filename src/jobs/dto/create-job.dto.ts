import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly noOfVacancies: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  readonly organizationId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  readonly datePublished: string;
}
