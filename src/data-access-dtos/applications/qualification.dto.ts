import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class QualificationDto {
  @ApiProperty({example: 'University of Nairobi'})
  @IsString()
  @IsNotEmpty()
  readonly institution: string;

  @ApiProperty({example:'Degree'})
  @IsString()
  @IsNotEmpty()
  readonly award: string;

  @ApiProperty({example:'Bachelor of Business Information Technology (BBIT)'})
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({example: 'First Class Honors'})
  @IsString()
  @IsNotEmpty()
  readonly grade: string;

  @ApiProperty({example:2022})
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly attainedYear: number;
}
