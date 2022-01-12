import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from '@files/dto';
import { Public } from '@auth/decorators';
import { Express } from 'express';
import * as express from 'express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { File } from './entities/file.entity';

@ApiBearerAuth()
@ApiTags('Attachments')
@Controller('attachment/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload single file' })
  @ApiResponse({ status: 201, description: 'File created/uploaded' })
  @ApiPayloadTooLargeResponse()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.filesService.upload(file, body);
  }

  @Public()
  @Get(':fileId')
  @ApiOperation({ summary: 'Download single file' })
  @ApiResponse({
    status: 200,
    description: 'The found file',
  })
  download(@Param('fileId') fileId: string, @Res() res: express.Response) {
    let item = this.filesService.download(fileId);
    res.set({
      'Content-Type': `${item.mimetype}`,
      'Content-Disposition': `attachment; filename="${item.newFileName}"`,
    });
    res.sendFile(fileId, { root: 'upload' });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single file' })
  @ApiResponse({
    status: 200,
    description: 'The deleted file',
    type: File,
  })
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
