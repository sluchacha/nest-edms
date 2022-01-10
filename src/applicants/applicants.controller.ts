import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  SerializeOptions,
  Logger,
} from '@nestjs/common';
import { PaginationQueryDto } from '@data-access-dtos/common/pagination-query.dto';
import { ApplicantsService } from '../data-access/applicants/applicants.service';
import {
  CreateApplicantDto,
  UpdateApplicantDto,
} from '@data-access-dtos/applicants';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Applicant } from '@data-access/applicants/applicant.entity';
import { ValidateObjectIdPipe } from '@common/pipes/validate-object-id.pipe';
import { ApplyApiStatus } from '@common/decorators/apply-api-status.decorator';
import MongooseClassSerializerInterceptor from '@common/interceptors/mongoose-class-serializer.interceptor';
import { ApplicantSnippetDto } from '@data-access-dtos/applicants/applicant-snippet.dto';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';

@Controller('applicants')
@ApiTags('Applicants')
@ApplyApiStatus(400, 401, 403, 404, 500)
@UseInterceptors(MongooseClassSerializerInterceptor(Applicant))
@SerializeOptions({
  strategy: 'exposeAll',
  excludePrefixes: ['_', '__'],
})
export class ApplicantsController {
  private readonly logger = new Logger(ApplicantsController.name);

  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get('test')
  @ApiOkResponse({ type: ApplicantSnippetDto })
  @UseInterceptors(new TransformInterceptor(ApplicantSnippetDto))
  async test(): Promise<any> {
    return await this.applicantsService.findOne('61d99fd2d27f5f73e2c93034');
  }

  @Post()
  @ApiOperation({ summary: 'Create applicant' })
  @ApiCreatedResponse({ type: Applicant })
  async create(
    @Body() createApplicantDto: CreateApplicantDto,
  ): Promise<Applicant> {
    return await this.applicantsService.create(createApplicantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch list of applicants' })
  @ApiOkResponse({ type: Applicant, isArray: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Applicant[]> {
    this.logger.log(`Hit the findAll route`);
    const applicants = await this.applicantsService.findAll(paginationQuery);
    this.logger.debug(`Found ${applicants.length} applicants`);
    return applicants;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch single applicant' })
  @ApiOkResponse({ type: Applicant })
  async findOne(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Applicant> {
    return await this.applicantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update single applicant' })
  @ApiOkResponse({ type: Applicant })
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    return await this.applicantsService.update(id, updateApplicantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single applicant' })
  @ApiOkResponse({ type: Applicant })
  async remove(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Applicant> {
    return await this.applicantsService.remove(id);
  }
}
