import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Region, RegionSchema } from './region.entity';

// We have each schema in it's own file (Open-Closed Principle)
@Schema({
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
})
export class Applicant {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @ApiProperty()
  @Prop({ maxlength: 255, required: true, trim: true, uppercase: true })
  fullName: string;

  @ApiProperty()
  @Prop({
    index: true,
    maxlength: 8,
    required: true,
    trim: true,
    uppercase: true,
  })
  nationalId: string;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  dob: Date;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  gender: string;

  @ApiProperty()
  @Prop({ required: true, trim: true, uppercase: true })
  maritalStatus: string;

  @ApiProperty()
  @Prop([{ type: String, trim: true }])
  telephone: string[];

  /**
   * The @Type(()=>Region) makes sure the class-tranformer
   * transforms the Region object too
   */
  @ApiProperty({ type: Region, required: false })
  @Prop({ type: RegionSchema })
  @Type(() => Region)
  region: Region;
}

export type ApplicantDocument = Applicant & Document;

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
