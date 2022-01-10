import { Organization } from '@data-access/organizations/organization.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

enum JobStatus {
  NOT_PUBLISHED = 'Not Published',
  ACCEPTING_APPLICATIONS = 'Accepting Applications',
  SHORT_LISTING = 'Short Listing',
  INTERVIEWS = 'Conducting Interviews',
  CLOSED = 'Closed',
  ARCHIVED = 'Archived',
}

/* enum JobStatus {
  NOT_PUBLISHED,
  ACCEPTING_APPLICATIONS,
  SHORT_LISTING,
  INTERVIEWS,
  CLOSED,
  ARCHIVED,
} */

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
    type: MongooseSchema.Types.ObjectId,
    ref: Organization.name,
    required: false,
  })
  organization: Types.ObjectId;

  @ApiProperty({ required: false })
  @Prop({ required: false, type: Date })
  datePublished: Date;

  @ApiProperty()
  @Prop({ default: JobStatus.NOT_PUBLISHED })
  status: JobStatus;
}

export type JobDocument = Job & Document;

export const JobSchema = SchemaFactory.createForClass(Job);
