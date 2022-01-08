import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { Role, RoleSchema } from './role.enitity';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  // @ApiProperty()
  @Exclude()
  @Prop({ maxlength: 50, required: true, trim: true, uppercase: true })
  firstName: string;

  // @ApiProperty()
  @Exclude()
  @Prop({ maxlength: 50, required: true, trim: true, uppercase: true })
  lastName: string;

  // @ApiProperty()
  @Exclude()
  @Prop({ index: true, maxlength: 50, required: true, lowercase: true })
  email: string;

  @ApiProperty()
  @Expose()
  get username(): string {
    return this.email;
  }

  // @ApiProperty()
  @Exclude()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty({ type: Role })
  @Transform(({ value }) => value.name)
  @Prop({ type: RoleSchema })
  role: Role;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', { virtuals: true });

UserSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, username: this.username };
  return 'secret_key';
};

UserSchema.methods.register = async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  await this.save();
};

/**
 * @summary Confirm if password is a valid password
 * @param {The users entered password} password
 * @returns a boolean value
 */
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
