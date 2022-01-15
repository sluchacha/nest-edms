import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// We disable Mongo's _id on embeded subdocuments, but we do not have to
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
