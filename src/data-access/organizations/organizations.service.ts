import { UpdateOrganizationDto } from '@data-access-dtos/organizations';
import { AbstractService } from '@data-access/common/abstract.service';
import { JobsService } from '@data-access/jobs/jobs.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './organization.entity';
import * as dot from 'dot-object';

@Injectable()
export class OrganizationsService extends AbstractService<Organization> {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    private readonly jobsService: JobsService,
  ) {
    super(organizationModel);
    this.recordName = Organization.name;
  }

  async remove(id: string): Promise<Organization> {
    // Check if there are related records
    const exists = await this.jobsService.existsAtLeastOneOrganizationJob(id);

    if (exists)
      throw new BadRequestException(
        `Cannot delete the organization with the given ID. Related records exist.`,
      );

    return await super.remove(id);
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    // Prepare object to update nested object fields separately if any
    dot.keepArray = true;
    const tgt = dot.dot({
      ...updateOrganizationDto,
    });
    return super.update(id, tgt);
  }
}
