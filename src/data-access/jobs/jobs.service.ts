import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from '@data-access-dtos/jobs';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './job.entity';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const jobExists = await this.jobModel.findOne({ code: createJobDto.code });
    if (jobExists)
      throw new BadRequestException(`A job with the given code already exists`);

    return await this.jobModel.create(createJobDto);
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
}
