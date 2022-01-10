import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { toUpper } from 'lodash';
import { ChapterSix } from './chapter-six.enum';
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

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isDisabled: boolean;

  @ApiPropertyOptional({
    description: 'List of qualifications',
    type: QualificationDto,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QualificationDto)
  qualifications: QualificationDto[];

  @ApiPropertyOptional({ description:'Position of progressive responsibility', example:'Intern at the University of Nairobi' })
  @IsOptional()
  @IsString()
  ppr: string;

  @ApiPropertyOptional({
    description: 'List of Chapter Six documents',
    isArray: true,
    enum: ChapterSix,
    example: [ChapterSix.KRA],
  })
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  chapterSix: string[];

  @IsOptional()
  @IsEnum(ChapterSix, {
    each: true,
    message: `Each value in chapterSix must be one of these ${Object.keys(
      ChapterSix,
    )}`,
  })
  @IsArray()
  get documents(): ChapterSix[] {
    return this.chapterSix.map((a) => ChapterSix[toUpper(a)]);
  }

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
