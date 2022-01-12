import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  SerializeOptions,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Public } from '@common/decorators';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities';
import { ApplyApiStatus } from '@common/decorators';
import { MongooseClassSerializerInterceptor } from '@common/interceptors';

@Controller('users')
@ApiTags('Users')
@ApplyApiStatus(400, 401, 403, 404, 500)
@UseInterceptors(MongooseClassSerializerInterceptor(User))
@SerializeOptions({
  strategy: 'exposeAll',
  excludePrefixes: ['_', '__'],
})
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Register a new application user' })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return await this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiOkResponse({ type: User, isArray: true })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
