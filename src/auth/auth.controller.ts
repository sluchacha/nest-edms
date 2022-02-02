import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Request,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { CreateUserDto } from '../users/dto';
import { LocalAuthGuard } from './guards';
import { AuthDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private _cookieResponse(response: ExpressResponse, access_token: string) {
    response
      .cookie('jwt', access_token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
      })
      .send({ access_token, success: true });
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

  @Get('profile')
  @ApiOperation({ summary: `Fetch currently logged in user's profile` })
  async getProfile(@Req() req: ExpressRequest) {
    const user: any = req.user;

    return await this.authService.findOne(user.id);
  }
}
