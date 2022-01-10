import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Applicant,
  ApplicantDocument,
} from 'src/data-access/applicants/applicant.entity';
import { Job, JobDocument } from 'src/data-access/jobs/job.entity';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from '@data-access-dtos/applications';
import { Application, ApplicationDocument } from './application.entity';
import { PaginationQueryDto } from '@data-access-dtos/common';

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);

  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<ApplicantDocument>,
  ) {}

  /**
   * Throws an error if they do not exist. */
  /**
   * @summary Checks whether a job and applicant with the specified id's exist.
   * @param jobId string
   * @param applicantId string
   * @returns job and applicant
   */
  private async checkApplicationDependencies(
    jobId: string,
    applicantId: string,
  ) {
    const job = await this.jobModel.findById(jobId);
    if (!job) throw new BadRequestException('Invalid job.');

    const applicant = await this.applicantModel.findById(applicantId);
    if (!applicant) throw new BadRequestException('Invalid applicant.');

    return { job, applicant };
  }

  /**@summary Creates an application, ONLY if an application with the job id
   * and applicant id specified in the DTO does not exist
   * @param id The application id
   * @param createApplicationDto The application object
   * @returns application
   */
  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const { jobId, applicantId } = createApplicationDto;
    const { job, applicant } = await this.checkApplicationDependencies(
      jobId,
      applicantId,
    );

    let application = await this.applicationModel
      .findOne({
        "job._id": job.id,
        "applicant._id": applicant.id,
      })
      .exec();

    if (application)
      throw new BadRequestException(
        'A similar application has already been recorded for the given job by the said applicant.',
      );

    const { isDisabled, qualifications, ppr, files, documents } =
      createApplicationDto;

    return await this.applicationModel.create({
      job, 
      applicant, 
      isDisabled: createApplicationDto.isDisabled,
      qualifications: createApplicationDto.qualifications,
      ppr: createApplicationDto.ppr,
      chapterSix: documents,
      files: createApplicationDto.files,
    });
  }

  /**
   * @Summary Fetch all applications
   * @param paginationQuery PaginationQueryDto(optional)
   * @returns List of applications
   */
  async findAll(paginationQuery: PaginationQueryDto): Promise<Application[]> {
    const { offset, limit } = paginationQuery;

    const applications = await this.applicationModel
      .find()
      .populate({
        path: 'job',
        select: '-description -__v',
        populate: { path: 'organization', select: 'code name' },
      })
      .populate('applicant', '-__v -createdAt')
      .select('-__v')
      .sort('createdAt')
      .skip(offset)
      .limit(limit)
      .exec();
    return applications;
  }

  /**Find a single application
   * @param id The application id
   * @returns An application
   */
  async findOne(id: string): Promise<Application> {
    const application = await this.applicationModel
      .findById(id)
      .populate({
        path: 'job',
        select: 'organization name noOfVacancies',
        populate: { path: 'organization', select: 'name' },
      })
      .populate('applicant', '-__v -createdAt')
      .select('-__v')
      .exec();
    return application;
  }

  /**Updates an application
   * @param id The application id
   * @param updateApplicationDto The updated application object
   * @returns The updated application
   */
  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    const { jobId, applicantId } = updateApplicationDto;
    const { job, applicant } = await this.checkApplicationDependencies(
      jobId,
      applicantId,
    );

    const application = await this.applicationModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            job: job.id,
            applicant: applicant.id,
            isDisabled: updateApplicationDto.isDisabled,
            qualifications: updateApplicationDto.qualifications,
            ppr: updateApplicationDto.ppr,
          },
        },
        { new: true },
      )
      .exec();

    if (!application)
      throw new NotFoundException(
        'The application with the given ID was not found.',
      );

    return application;
  }

  /**Deletes an application
   * @param id The application id
   * @returns The deleted application
   */
  async remove(id: string): Promise<Application> {
    const application = await this.applicationModel
      .findByIdAndRemove(id)
      .exec();

    if (!application)
      throw new NotFoundException(
        'The application with the given ID was not found.',
      );

    return application;
  }
  /**Upload files to folder and update related record
   * @todo NEEDS IMPLEMENTATION USING MULTER
   * @param id The application id
   */
  uploadFiles(id: string) {}

  /**Checks whether an applicant has any application
   * @param applicantId The applicant's id
   * @returns true if there is an application, false if there is none
   */
  async checkApplicantHasApplications(applicantId: string): Promise<Boolean> {
    const application = await this.applicationModel
      .findOne({ 'applicant.id': applicantId })
      .exec();

    return application ? true : false;
  }

  /**Finds all applications to an applicant
   * @param applicantId The applicant's id
   * @returns List of applications made by the applicant
   */
  async findAllApplicantApplications(applicantId: string): Promise<any> {
    const applications = await this.applicationModel
      .find({
        'applicant._id': applicantId,
      })
      .populate({
        path: 'job',
        select: '-__v',
        populate: { path: 'organization', select: 'name' },
      })
      .select('-__v')
      .exec();

    return applications;
  }

  /**Finds all applications for a specific job
   * @param jobId The job id
   * @returns List of applicants for the job
   */
  async findAllJobApplicants(jobId: string) {
    const applications = await this.applicationModel
      .find({
        'job._id': jobId,
      })
      .populate('applicant -__v')
      .exec();

    return applications;
  }
}
