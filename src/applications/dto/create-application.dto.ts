import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { FileDto } from './file.dto';
import { UpdateApplicationDto } from './update-application.dto';

export class CreateApplicationDto extends UpdateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  jobId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  applicantId: string;

  @ApiProperty({
    description: 'List of uploaded files',
    type: FileDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
