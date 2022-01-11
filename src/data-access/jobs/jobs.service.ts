import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from '@data-access-dtos/jobs';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './job.entity';
import { Model } from 'mongoose';
import { OrganizationsService } from '@data-access/organizations/organizations.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    private readonly organizationService: OrganizationsService,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const jobExists = await this.jobModel.findOne({ code: createJobDto.code });
    if (jobExists)
      throw new BadRequestException(`A job with the given code already exists`);

    // Check that the organization exists
    const organizationExists = await this.organizationService.findRecordById(
      createJobDto.organizationId,
    );

    const job = new this.jobModel({
      ...createJobDto,
      organization: organizationExists,
    });

    return await this.jobModel.create(job);
  }

  async findAll(): Promise<Job[]> {
    return await this.jobModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    return await this.jobModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateJobDto,
        },
        { new: true },
      )
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
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

  /**
   * @summary Checks whether an organization has related records to jobs
   * @param organizationId The organization id
   * @returns A promise of boolean, true if there are records,
   * false if no records
   */
  async existsAtLeastOneOrganizationJob(
    organizationId: string,
  ): Promise<boolean> {
    const job = await this.jobModel
      .findOne({ 'organization._id': organizationId })
      .exec();
    if (job) return true;

    return false;
  }
}
