import { MongooseClientSession } from '@common/decorators/transaction-param.decorator';
import { PaginationQueryDto } from '@data-access-dtos/common/pagination-query.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export abstract class AbstractService {
  protected recordName: string = 'record';
  protected constructor(protected readonly model: Model<any>) {}

  async create(
    dto: any,
    ref: any,
    session?: MongooseClientSession,
  ): Promise<any> {
    // Check if record exist
    let record = await this.model.findOne(ref).session(session);
    // .exec();

    if (record)
      throw new BadRequestException(`The ${this.recordName} already exists`);

    record = new this.model(dto);

    return record.save({ session });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<any[]> {
    const { limit, offset } = paginationQuery;
    return await this.model.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string): Promise<any> {
    const record = await this.model.findById(id).exec();

    if (!record)
      throw new NotFoundException(
        `The ${this.recordName} with the given id was not found`,
      );

    return record;
  }

  async update(
    id: string,
    dto: any,
    session?: MongooseClientSession,
  ): Promise<any> {
    const record = await this.model.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true, session },
    );
    // .exec();

    if (!record)
      throw new NotFoundException(
        `The ${this.recordName} with the given id was not found`,
      );

    return record;
  }

  async remove(id: string): Promise<any> {
    const record = await this.model.findByIdAndRemove(id).exec();

    if (!record)
      throw new NotFoundException(
        `The ${this.recordName} with the given id was not found`,
      );

    return record;
  }
}
