import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RegionDto {
  @ApiProperty({ example: 'Busia', required: false })
  @IsOptional()
  @IsString()
  readonly county: string;

  @ApiProperty({ example: 'Nambale', required: false })
  @IsOptional()
  @IsString()
  readonly subcounty: string;

  @ApiProperty({ example: 'Nambale Township', required: false })
  @IsOptional()
  @IsString()
  readonly ward: string;
}
