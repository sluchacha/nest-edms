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
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateJobDto } from './dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Job } from './entities';
import { MongooseClassSerializerInterceptor } from '@common/interceptors';
import { PaginationQueryDto } from '@common/dto';

@Controller('jobs')
@ApiTags('Jobs')
@UseInterceptors(MongooseClassSerializerInterceptor(Job))
@SerializeOptions({
  strategy: 'exposeAll',
  excludePrefixes: ['_', '__'],
})
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create job' })
  @ApiCreatedResponse({ type: Job })
  async create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch list of jobs' })
  @ApiOkResponse({ type: Job, isArray: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Job[]> {
    return await this.jobsService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch single job' })
  @ApiOkResponse({ type: Job })
  async findOne(@Param('id') id: string): Promise<Job> {
    return await this.jobsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return await this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Job> {
    return await this.jobsService.remove(id);
  }
}
