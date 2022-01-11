import {
  Applicant,
  ApplicantSchema,
} from '@data-access/applicants/applicant.entity';
import { Job, JobSchema } from '@data-access/jobs/job.entity';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Qualification {
  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  institution: string;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  award: string;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  grade: string;

  @ApiProperty()
  @Prop({ required: true, trim: true })
  attainedYear: number;
}

// Generate a Mongoose Schema before use as Subdocument
export const QualificationSchema = SchemaFactory.createForClass(Qualification);

@Schema({ _id: false })
export class FileDocument {
  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true, trim: true })
  filename: string;

  @ApiProperty()
  @Prop({ required: true, trim: true })
  uri: string;
}

// Generate a Mongoose Schema before use as Subdocument
export const FileDocumentSchema = SchemaFactory.createForClass(FileDocument);

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Application {
  @ApiProperty({ type: Job, required: true })
  @Prop({
    // type: MongooseSchema.Types.ObjectId,
    // ref: Job.name,
    type: JobSchema,
    required: true,
  })
  @Type(() => Job)
  job: Job;

  @ApiProperty({ type: Applicant, required: true })
  @Prop({
    // type: MongooseSchema.Types.ObjectId,
    // ref: Applicant.name,
    type: ApplicantSchema,
    required: true,
  })
  @Type(() => Applicant)
  applicant: Applicant;

  @ApiProperty({ required: false })
  @Prop({ default: false })
  isDisabled: boolean;

  @ApiProperty({ type: Qualification, isArray: true, required: false })
  @Prop({ type: [QualificationSchema], default: [] })
  qualifications: Qualification[];

  @ApiProperty({ required: false })
  @Prop({ maxlength: 255, trim: true, uppercase: true })
  ppr: string;

  @ApiProperty({ required: false })
  @Prop([{ type: String, trim: true }])
  chapterSix: string[];

  @ApiProperty({ type: FileDocument, isArray: true, required: false })
  @Prop({ type: [FileDocumentSchema], default: [] })
  files: FileDocument[];

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type ApplicationDocument = Application & Document;

export const ApplicationSchema = SchemaFactory.createForClass(Application);
// ApplicationSchema.index({ 'job._id': 1, 'applicant._id': 1 });
