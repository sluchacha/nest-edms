import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
