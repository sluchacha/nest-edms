import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Region {
  @ApiProperty({ required: false })
  @Prop({ maxlength: 50, required: false, trim: true, uppercase: true })
  county: string;

  @ApiProperty({ required: false })
  @Prop({ maxlength: 50, required: false, trim: true, uppercase: true })
  subcounty: string;

  @ApiProperty({ required: false })
  @Prop({ maxlength: 50, required: false, trim: true, uppercase: true })
  ward: string;
}

@Schema()
export class Applicant {
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

  @ApiProperty({ type: Region, required: false })
  @Prop({ type: Region })
  region: Region;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type ApplicantDocument = Applicant & Document;

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
