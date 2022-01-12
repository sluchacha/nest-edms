import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from '@common/decorators';
import { PersonDto } from '@common/dto';
import { Express } from 'express';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('sample')
  getSampleDocs() {
    const data = [
      { id: 1, name: 'Stephen' },
      { id: 2, name: 'John' },
    ];

    console.table(data);

    return data;
  }

  /* @Public()
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() person: PersonDto) {
    console.log(person);
    return person;
  } */

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body() person: PersonDto) {
    return { person, file };
  }
}
