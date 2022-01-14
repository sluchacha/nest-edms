import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Public } from '@auth/decorators';
import { PersonDto } from '@common/dto';

@Controller()
@ApiTags('App')
// @ApiCookieAuth()
@ApiExcludeController()
export class AppController {
  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body() person: PersonDto) {
    return { person, file };
  }
}
