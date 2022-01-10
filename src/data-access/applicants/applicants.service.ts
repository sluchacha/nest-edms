import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '@data-access-dtos/common/pagination-query.dto';
import {
  CreateApplicantDto,
  UpdateApplicantDto,
} from '@data-access-dtos/applicants';
import { Applicant, ApplicantDocument } from './applicant.entity';
import { ApplicationsService } from '../applications/applications.service';
import * as dot from 'dot-object';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<ApplicantDocument>,
    private readonly applicationsService: ApplicationsService,
  ) {}

  /**
   * @summary Create a new applicant if they do not exist.
   * The National ID must be unique.
   * @param createApplicantDto CreateApplicantDto
   * @returns Promise< Applicant >
   * @throws BadRequestException if applicant with the national id exists
   */
  async create(createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    // Check if applicant exist
    let applicant = await this.applicantModel
      .findOne({ nationalId: createApplicantDto.nationalId })
      .exec();

    if (applicant)
      throw new BadRequestException(`The applicant already exists`);

    applicant = new this.applicantModel(createApplicantDto);

    return await this.applicantModel.create(applicant);
  }

  /**
   * @summary Find a list of applicants.
   * This can be paginated depending on query parameters passed.
   * @param paginationQuery PaginationQueryDto(optional)
   * @returns Promise<Applicant[]>
   */
  async findAll(paginationQuery: PaginationQueryDto): Promise<Applicant[]> {
    const { limit, offset } = paginationQuery;
    return await this.applicantModel.find().skip(offset).limit(limit).exec();
  }

  /**
   * @summary Find a single applicant with the specified id
   * @param id string
   * @returns Promise < Applicant >
   * @throws NotFoundException if applicant record is not found
   */
  async findOne(id: string): Promise<Applicant> {
    const applicant = await this.applicantModel.findById(id).exec();

    if (!applicant)
      throw new NotFoundException(
        `The applicant with the given id was not found`,
      );

    return applicant;
  }

  /**
   * Update applicant with the specified id optimistically.
   * @param id string
   * @param updateApplicantDto UpdateApplicantDto
   * @returns Promise< Applicant >
   * @throws NotFoundException if applicant record is not found
   */
  async update(
    id: string,
    updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    // Prepare object to update nested object fields separately
    dot.keepArray = true;
    let tgt = dot.dot(updateApplicantDto);

    const existingApplicant = await this.applicantModel
      .findByIdAndUpdate(id, { $set: tgt }, { new: true })
      .exec();

    if (!existingApplicant)
      throw new NotFoundException(
        `The applicant with the given id was not found`,
      );

    return existingApplicant;
  }

  /**
   * @summary Delete applicant with the specified id optimistically.
   * It only deletes if there are no related records.
   * e.g. The applicant has no applications.
   * @param id string. Applicants ID
   * @returns Promise< Applicant >
   * @throws BadRequestException when applicant has related records
   * @throws NotFoundException if applicant record is not found
   */
  async remove(id: string): Promise<Applicant> {
    const flag = await this.applicationsService.checkApplicantHasApplications(
      id,
    );

    if (flag)
      throw new BadRequestException(
        'The applicant with the given ID CANNOT be deleted. There is related data.',
      );

    const applicant = await this.applicantModel.findByIdAndRemove(id).exec();

    if (!applicant)
      throw new NotFoundException(
        `The applicant with the given id was not found`,
      );

    return applicant;
  }
}