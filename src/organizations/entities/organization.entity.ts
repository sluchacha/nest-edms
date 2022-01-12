import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Organization {
  @ApiProperty()
  @Prop({
    index: true,
    unique: true,
    maxlength: 50,
    required: true,
    trim: true,
  })
  code: string;

  @ApiProperty()
  @Prop({ maxlength: 255, required: true, trim: true, uppercase: true })
  name: string;

  @ApiProperty()
  @Prop({ maxlength: 1024, trim: true })
  description: string;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type OrganizationDocument = Organization & Document;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
