import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

/**
 * @summary abstract repository class for mongodb
 */
export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async find(entityFilterQuery?: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  /* async findOne(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery);
  } */

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, { _id: 0, __v: 0, ...projection })
      .exec();
  }

  async findOneAndRemove(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOneAndRemove(entityFilterQuery);
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async findById(id: string): Promise<T | null> {
    return this.entityModel.findById(id);
  }

  async findByIdAndRemove(id: string): Promise<T | null> {
    return this.entityModel.findByIdAndRemove(id);
  }

  async findByIdAndUpdate(
    id: string,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findByIdAndUpdate(id, updateEntityData, {
      new: true,
    });
  }

  async create(createEntityData: unknown): Promise<T> {
    return this.entityModel.create(createEntityData);
  }

  async deleteMany(entityFilterQuery?: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(entityFilterQuery);
    return result.deletedCount >= 1;
  }
}
