import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// We disable Mongo's _id on embeded subdocuments, but we do not have to
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

// Generate a Mongoose Schema before use as Subdocument
export const RegionSchema = SchemaFactory.createForClass(Region);
