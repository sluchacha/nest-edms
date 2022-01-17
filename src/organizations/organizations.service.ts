import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dot from 'dot-object';
import { UpdateOrganizationDto } from './dto';
import { AbstractService } from '../common/services/abstract.service';
import { Organization, OrganizationDocument } from './entities';
import { Job, JobDocument } from '../jobs/entities';

@Injectable()
export class OrganizationsService extends AbstractService<Organization> {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    @InjectModel(Job.name)
    private readonly jobModel: Model<JobDocument>,
  ) {
    super(organizationModel);
    this.recordName = Organization.name;
  }

  async remove(id: string): Promise<Organization> {
    // Check for related records - tagged in jobs
    const exists = await this.jobModel
      .findOne({ 'organization._id': id })
      .exec();

    if (exists)
      throw new BadRequestException(
        `The organization with the given ID CANNOT be deleted. There is related data.`,
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
