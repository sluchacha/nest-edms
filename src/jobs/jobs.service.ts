import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './entities';
import { Organization, OrganizationDocument } from '@organizations/entities';
import { Model } from 'mongoose';
import { AbstractService } from '@common/services';
import * as dot from 'dot-object';
import { Application, ApplicationDocument } from '@applications/entities';

@Injectable()
export class JobsService extends AbstractService<Job> {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
  ) {
    super(jobModel);
    this.recordName = Job.name;
  }

  private async checkOrganizationExists(
    organizationId: string,
  ): Promise<Organization> {
    const organization = await this.organizationModel.findById(organizationId);

    if (!organization) {
      throw new BadRequestException(
        `The organization with the given ID does not exist`,
      );
    }

    return organization;
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const { code, organizationId } = createJobDto;
    const jobExists = await this.jobModel.findOne({ code });
    if (jobExists)
      throw new BadRequestException(`A job with the given code already exists`);

    const organization = await this.checkOrganizationExists(organizationId);

    const job = new this.jobModel({
      ...createJobDto,
      organization,
    });

    return await this.jobModel.create(job);
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const { organizationId, ...rest } = updateJobDto;

    dot.keepArray = true;
    let tgt = dot.dot({ ...rest });
    let dto = { ...tgt };
    if (organizationId) {
      const organization = await this.checkOrganizationExists(organizationId);
      dto = {
        ...tgt,
        organization,
      };
    }

    this.logger.debug({ dto });
    return await super.update(id, dto);
  }

  async remove(id: string): Promise<Job> {
    // Check for related records - tagged in applications
    const exists = await this.applicationModel
      .findOne({ 'job._id': id })
      .exec();

    if (exists)
      throw new BadRequestException(
        `The job with the given ID CANNOT be deleted. There is related data.`,
      );

    return await super.remove(id);
  }

  /**
   * @summary Finds all jobs for a specific organization
   * @param organizationId The organization id
   * @returns List of jobs for the organization
   */
  async findAllOrganizationJobs(organizationId: string): Promise<Job[]> {
    const jobs = await this.jobModel
      .find({ 'organization._id': organizationId })
      .exec();

    return jobs;
  }
}
