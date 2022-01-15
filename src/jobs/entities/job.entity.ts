import { Organization, OrganizationSchema } from '@organizations/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { JobStatus } from '@jobs/enums';

@Schema({
  toJSON: {
    virtuals: true,
  },
  discriminatorKey: 'status',
  timestamps: true,
})
export class Job {
  @ApiProperty()
  @Prop({
    index: true,
    required: true,
    trim: true,
    unique: true,
    maxlength: 50,
  })
  code: string;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true, maxlength: 255 })
  name: string;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true, maxlength: 1024 })
  description: string;

  @ApiProperty()
  @Prop({ required: true, max: 500 })
  noOfVacancies: number;

  @ApiProperty({ type: Organization, required: false })
  @Prop({
    type: OrganizationSchema,
    required: true,
  })
  @Type(() => Organization)
  organization: Organization;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  datePublished: Date;

  @ApiProperty()
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    enum: JobStatus,
    default: JobStatus.NOT_PUBLISHED,
  })
  status: JobStatus;
}

export type JobDocument = Job & Document;

export const JobSchema = SchemaFactory.createForClass(Job);
