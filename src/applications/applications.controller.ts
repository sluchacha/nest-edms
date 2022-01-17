import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationDto } from './dto';
import { ApplyApiStatus } from '../common/decorators';
import { Application } from '../applications/entities';
import { PaginationQueryDto } from '../common/dto';
import { MongooseClassSerializerInterceptor } from '../common/interceptors';
import { ValidateObjectIdPipe } from '../common/pipes';

@Controller('applications')
@ApiTags('Applications')
@ApplyApiStatus(400, 401, 403, 404, 500)
@UseInterceptors(MongooseClassSerializerInterceptor(Application))
@SerializeOptions({
  strategy: 'exposeAll',
  excludePrefixes: ['_', '__'],
})
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a single application' })
  @ApiCreatedResponse({ type: Application })
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return await this.applicationsService.create(createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch list of applications' })
  @ApiOkResponse({ type: Application, isArray: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Application[]> {
    return await this.applicationsService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch single application' })
  @ApiOkResponse({ type: Application })
  async findOne(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Application> {
    return await this.applicationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update single application' })
  @ApiOkResponse({ type: Application })
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    return await this.applicationsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single application' })
  @ApiOkResponse({ type: Application })
  async remove(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Application> {
    return await this.applicationsService.remove(id);
  }

  @Get('applicant/:applicantId')
  @ApiOperation({ summary: 'Fetch list of applications to a single applicant' })
  @ApiOkResponse({ type: Application, isArray: true })
  async findAllApplicantApplications(
    @Param('applicantId', ValidateObjectIdPipe) applicantId: string,
  ) {
    return await this.applicationsService.findAllApplicantApplications(
      applicantId,
    );
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'Fetch list of applications to a specific job' })
  @ApiOkResponse({ type: Application, isArray: true })
  async findAllJobApplications(
    @Param('jobId', ValidateObjectIdPipe) jobId: string,
  ) {
    return await this.applicationsService.findAllJobApplications(jobId);
  }
}
