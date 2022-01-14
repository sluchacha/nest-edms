import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Request,
  UseGuards,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators';
import { CreateUserDto } from '@users/dto';
import { LocalAuthGuard } from './guards';
import { AuthDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  private _cookieResponse(response: ExpressResponse, access_token: string) {
    this.logger.debug({ access_token });
    response
      .cookie('jwt', access_token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
      })
      .send({ access_token, message: `Token successfully created` });
  }

  @Post('register')
  @ApiOperation({ summary: 'Registration' })
  @Public()
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: ExpressResponse,
  ): Promise<any> {
    const { access_token } = await this.authService.register(createUserDto);
    // Sending token as a cookie
    this._cookieResponse(response, access_token);
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
    this._cookieResponse(response, access_token);
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
}
