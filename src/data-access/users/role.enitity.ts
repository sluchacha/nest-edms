import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @ApiProperty()
  @Prop({
    index: true,
    maxlength: 50,
    required: true,
    trim: true,
    lowercase: true,
  })
  name: string;

  @ApiProperty()
  @Prop({ type: [String], required: false })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
