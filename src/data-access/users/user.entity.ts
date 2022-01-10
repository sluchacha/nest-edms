import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  //Virtuals
  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  username: string;

  //Method Functions
  register: Function;
  generateAuthToken: Function;
  validatePassword: Function;

  //Actual Properties
  @Prop({ maxlength: 50, required: true, trim: true, uppercase: true })
  @Exclude()
  firstName: string;

  @Prop({ maxlength: 50, required: true, trim: true, uppercase: true })
  @Exclude()
  lastName: string;

  @Prop({ unique: true, maxlength: 50, required: true, lowercase: true })
  @Exclude()
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @ApiProperty({ example: 'Admin' })
  @Prop({ required: true, trim: true, uppercase: true })
  role: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('username').get(function (this: UserDocument) {
  return `${this.email}`;
});

UserSchema.methods.register = async function (this: UserDocument) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  return await this.save();
};

UserSchema.methods.generateAuthToken = function (this: UserDocument) {
  const payload = { id: this._id, username: this.username };
  return 'secret_key';
};

/**
 * @summary Confirm if password is a valid password
 * @param {The users entered password} password
 * @returns A promise with a boolean value
 */
UserSchema.methods.validatePassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export { UserSchema };
