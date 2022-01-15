import { Applicant, ApplicantSchema } from '@applicants/entities';
import { Job, JobSchema } from '@jobs/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Qualification, QualificationSchema } from './qualification.entity';
import { FileDocument, FileDocumentSchema } from './file-document.entity';

// We have each schema in it's own file (Open-Closed Principle)
@Schema({
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
})
export class Application {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @ApiProperty({ type: Job, required: true })
  @Prop({
    type: JobSchema,
    required: true,
  })
  @Type(() => Job)
  job: Job;

  @ApiProperty({ type: Applicant, required: true })
  @Prop({
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
}

export type ApplicationDocument = Application & Document;

export const ApplicationSchema = SchemaFactory.createForClass(Application);
