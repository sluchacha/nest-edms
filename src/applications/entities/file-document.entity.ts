import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// We disable Mongo's _id on embeded subdocuments, but we do not have to
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
