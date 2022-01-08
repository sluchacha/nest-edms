import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type OrganizationDocument = Organization & mongoose.Document;

@Schema()
export class Organization {
  @Prop({ index: true, maxlength: 50, required: true, trim: true })
  code: string;

  @Prop({ maxlength: 255, required: true, trim: true, uppercase: true })
  name: string;

  @Prop({ maxlength: 1024, trim: true })
  description: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
