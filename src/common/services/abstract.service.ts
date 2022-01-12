import { PaginationQueryDto } from '../dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export abstract class AbstractService<T> {
  protected recordName: string = 'record';
  protected constructor(protected readonly model: Model<any>) {}

  async create(dto: any, ref: any): Promise<T> {
    // Check if record exist
    let record = await this.model.findOne(ref).exec();

    if (record)
      throw new BadRequestException(`The ${this.recordName} already exists`);

    record = new this.model(dto);

    return await this.model.create(record);
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<T[]> {
    const { limit, offset } = paginationQuery;
    return await this.model.find().skip(offset).limit(limit).exec();
  }

  /**
   * Finds a single record
   * @param id
   * @returns The record if found
   * @throws NotFoundException if record is not found
   */
  async findOne(id: string): Promise<T> {
    const record = await this.model.findOne({ _id: id }).exec();

    if (!record)
      throw new NotFoundException(
        `The ${this.recordName} with the given id was not found`,
      );

    return record;
  }

  async update(id: string, dto: any): Promise<T> {
    const record = await this.model
      .findByIdAndUpdate(
        id,
        { $set: { ...dto, updatedAt: Date.now() } },
        { new: true },
      )
      .exec();

    if (!record)
      throw new NotFoundException(
        `The ${this.recordName} with the given id was not found`,
      );

    return record;
  }

  async remove(id: string): Promise<T> {
    const record = await this.model.findByIdAndRemove(id).exec();

    if (!record)
      throw new NotFoundException(
        `The ${this.recordName} with the given id was not found`,
      );

    return record;
  }

  async recordExists(id: string): Promise<boolean> {
    const record = await this.model.findOne({ _id: id }).exec();
    if (record) return true;

    return false;
  }
}
