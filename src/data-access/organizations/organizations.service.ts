import { AbstractService } from '@data-access/common/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './organization.entity';

@Injectable()
export class OrganizationsService extends AbstractService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
  ) {
    super(organizationModel);
    this.recordName = Organization.name;
  }
}
