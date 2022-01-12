import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  Res,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeController, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from '@auth/decorators';
import { PersonDto } from '@common/dto';
import {
  Express,
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { User } from '@users/entities';
import { AuthDto } from '@auth/dto';
import { AuthService } from '@auth/auth.service';
import { JwtAuthGuard } from '@auth/guards';

@Controller()
@ApiTags('App')
// @ApiExcludeController()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: ExpressRequest,
    @Body() authDto: AuthDto,
    @Res() response: ExpressResponse,
  ): Promise<any> {
    const { access_token: jwt } = await this.authService.login(req.user);
    // Sending token as a cookie
    response
      .cookie('jwt', jwt, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
      })
      .send({ message: `Token successfully created` });
  }

  @Get('protected')
  getUser(@Request() req: ExpressRequest): any {
    return req.user;
  }

  @Public()
  @Get('public')
  getHello(): string {
    return 'This route is Public hence not protected';
  }

  /** Must be called from front-end in order to logout
   * as the cookie is not accessible from the front-end
   */
  @Post('logout')
  logout(@Res({ passthrough: true }) response: ExpressResponse) {
    response.clearCookie('jwt');

    return { message: 'Successfully logged out' };
  }

  /* @Public()
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
  } */

  /* @Public()
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() person: PersonDto) {
    console.log(person);
    return person;
  } */

  /* @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body() person: PersonDto) {
    return { person, file };
  } */
}
