import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

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

export const RegionSchema = SchemaFactory.createForClass(Region);

@Schema({
  toJSON: {
    virtuals: true,
  },
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

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type ApplicantDocument = Applicant & Document;

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
