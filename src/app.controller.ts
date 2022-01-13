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
import {
  ApiCreatedResponse,
  ApiExcludeController,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
import { CreateUserDto } from '@users/dto';

@Controller()
@ApiTags('App')
// @ApiExcludeController()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registration' })
  @Public()
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: ExpressResponse,
  ): Promise<any> {
    const { access_token } = await this.authService.register(createUserDto);
    // Sending token as a cookie
    response
      .cookie('jwt', access_token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
      })
      .send({ access_token, message: `Token successfully created` });
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req: ExpressRequest,
    @Body() authDto: AuthDto,
    @Res() response: ExpressResponse,
  ): Promise<any> {
    const { access_token } = await this.authService.login(req.user);
    // Sending token as a cookie
    response
      .cookie('jwt', access_token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
      })
      .send({ access_token, message: `Token successfully created` });
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

  /**
   * @summary Must be called from front-end in order to logout
   * as the cookie is not accessible from the front-end
   */
  @HttpCode(200)
  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Res({ passthrough: true }) response: ExpressResponse) {
    response.clearCookie('jwt');

    return { message: 'Successfully logged out' };
  }

  /* @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body() person: PersonDto) {
    return { person, file };
  } */
}
