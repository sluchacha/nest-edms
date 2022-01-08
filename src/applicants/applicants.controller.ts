import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

@Controller('applicants')
@ApiTags('Applicants')
@ApplyApiStatus(400, 401, 403, 404, 500)
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

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
    return await this.applicantsService.findAll(paginationQuery);
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
  @ApiOperation({ summary: 'Update a single applicant' })
  @ApiOkResponse({ type: Applicant })
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    return await this.applicantsService.update(id, updateApplicantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single applicant' })
  @ApiOkResponse({ type: Applicant })
  async remove(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Applicant> {
    return await this.applicantsService.remove(id);
  }
}
