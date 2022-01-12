import { Organization, OrganizationSchema } from '@organizations/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum JobStatus {
  NOT_PUBLISHED = 'NOT_PUBLISHED',
  ACCEPTING_APPLICATIONS = 'ACCEPTING_APPLICATIONS',
  SHORT_LISTING = 'SHORT_LISTING',
  CONDUCTING_INTERVIEWS = 'CONDUCTING_INTERVIEWS',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

@Schema({
  toJSON: {
    virtuals: true,
  },
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

  @ApiProperty({ required: false })
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
  @Prop({ default: JobStatus.NOT_PUBLISHED })
  status: JobStatus;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type JobDocument = Job & Document;

export const JobSchema = SchemaFactory.createForClass(Job);
