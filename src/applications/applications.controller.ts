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
import { ApplicationsService } from '@data-access/applications/applications.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from '@data-access-dtos/applications';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApplyApiStatus } from '@common/decorators/apply-api-status.decorator';
import { Application } from '@data-access/applications/application.entity';
import { PaginationQueryDto } from '@data-access-dtos/common';

@Controller('applications')
@ApiTags('Applications')
@ApplyApiStatus(400, 401, 403, 404, 500)
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
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}
