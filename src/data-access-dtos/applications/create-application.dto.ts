import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FileDto } from './file.dto';
import { QualificationDto } from './qualification.dto';

export class CreateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  jobId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  applicantId: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDisabled: boolean;

  @ApiProperty({ type: QualificationDto, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QualificationDto)
  qualifications: QualificationDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ppr: string;

  @ApiProperty({ type: FileDto, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
