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
} from '@nestjs/common';

import { OrganizationsService } from '@data-access/organizations/organizations.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@data-access-dtos/organizations';
import { PaginationQueryDto } from '@data-access-dtos/common/pagination-query.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Organization } from '@data-access/organizations/organization.entity';
import { ApplyApiStatus } from '@common/decorators/apply-api-status.decorator';
import MongooseClassSerializerInterceptor from '@common/interceptors/mongoose-class-serializer.interceptor';
import { ValidateObjectIdPipe } from '@common/pipes/validate-object-id.pipe';

@Controller('organizations')
@ApiTags('Organizations')
@ApplyApiStatus(400, 401, 403, 404, 500)
@UseInterceptors(MongooseClassSerializerInterceptor(Organization))
@SerializeOptions({
  strategy: 'exposeAll',
  excludePrefixes: ['_', '__'],
})
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create organization' })
  @ApiCreatedResponse({ type: Organization })
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const ref = { code: createOrganizationDto.code };
    return await this.organizationsService.create(createOrganizationDto, ref);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch list of organizations' })
  @ApiOkResponse({ type: Organization, isArray: true })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Organization[]> {
    return await this.organizationsService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch single organization' })
  findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.organizationsService.findRecordById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update single organization' })
  @ApiOkResponse({ type: Organization })
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete single organization' })
  @ApiOkResponse({ type: Organization })
  async remove(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<Organization> {
    return await this.organizationsService.remove(id);
  }
}
