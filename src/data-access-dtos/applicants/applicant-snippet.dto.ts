import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

/**
 * @summary Using @Exclude() and @Expose() to remove all but exposed properties
 * This only works with a generic transform interceptor that call plainToClass to
 * convert the object
 */
@Exclude()
export class ApplicantSnippetDto {
  @ApiProperty()
  @Expose()
  @IsMongoId()
  readonly id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly fullName: string;
}
