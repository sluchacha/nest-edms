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
import { CreateUserDto, UpdateUserDto, UserSnippetDto } from './dto';
import { Public } from '@auth/decorators';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities';
import { ApplyApiStatus } from '@common/decorators';
import {
  MongooseClassSerializerInterceptor,
  TransformInterceptor,
} from '@common/interceptors';

@Controller('users')
@ApiTags('Users')
@ApplyApiStatus(400, 401, 403, 404, 500)
@UseInterceptors(
  MongooseClassSerializerInterceptor(User),
  new TransformInterceptor(UserSnippetDto),
)
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
  @ApiCreatedResponse({ type: UserSnippetDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return await this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiOkResponse({ type: UserSnippetDto, isArray: true })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Fetch single user' })
  @ApiOkResponse({ type: UserSnippetDto })
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Update single user' })
  @ApiOkResponse({ type: UserSnippetDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single user' })
  @ApiOkResponse({ type: UserSnippetDto })
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }
}
