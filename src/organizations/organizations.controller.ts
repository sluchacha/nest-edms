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
} from '@nestjs/common';

import { OrganizationsService } from '@data-access/organizations/organizations.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@data-access-dtos/organizations';
import { PaginationQueryDto } from '@data-access-dtos/common/pagination-query.dto';
import { TransactionInterceptor } from '@common/interceptors/transaction.interceptor';
import {
  MongooseClientSession,
  TransactionParam,
} from '@common/decorators/transaction-param.decorator';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  create(
    @TransactionParam() session: MongooseClientSession,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    const ref = { code: createOrganizationDto.code };
    return this.organizationsService.create(
      createOrganizationDto,
      ref,
      session,
    );
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.organizationsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(TransactionInterceptor)
  update(
    @TransactionParam() session: MongooseClientSession,
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto, session);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
