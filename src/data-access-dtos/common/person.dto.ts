import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsDateString,
  ValidateNested,
  IsNotEmpty,
  ArrayNotEmpty,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { QualificationDto } from '@data-access-dtos/applications';

export class PersonDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  nationalId: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  telephone: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QualificationDto)
  qualification: QualificationDto[];

  @Expose()
  get nameAndDob(): string {
    return `${this.fullname} ${this.dob}`;
  }
}
