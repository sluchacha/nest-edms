import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

/**
 * @summary Validate and ensure the passed parameter or query value can be found
 * in the database. Use as follows:
 * @Param('id', ValidateObjectIdPipe) id: string | ObjectID
 * @Query('id', new ValidateObjectIdPipe()) id: string | ObjectID
 */
@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new BadRequestException('Invalid ID.');

    return value;
  }
}
