import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { toUpper } from 'lodash';
import { QualificationDto } from './qualification.dto';
import { ChapterSix } from '../enums';

/**
 * @Summary I am NOT using @nestjs/swagger PartialType as this breaks validation
 * I have split what is required as Optional in the update dto which will
 * be extended by the create dto.
 */
export class UpdateApplicationDto {
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

  @ApiPropertyOptional({
    description: 'Position of progressive responsibility',
    example: 'Intern at the University of Nairobi',
  })
  @IsOptional()
  @IsString()
  ppr: string;

  @ApiPropertyOptional({
    description: 'List of Chapter Six documents',
    isArray: true,
    enum: ChapterSix,
    enumName: 'ChapterSix',
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
    if (!this.chapterSix) return undefined;
    return this.chapterSix.map((a) => ChapterSix[toUpper(a)]);
  }
}
