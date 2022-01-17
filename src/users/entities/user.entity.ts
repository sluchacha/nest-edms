import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  discriminatorKey: 'role',
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  //Virtuals
  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  //Method Functions
  validatePassword: Function;

  //Actual Properties
  @Prop({ maxlength: 50, required: true, trim: true, uppercase: true })
  @Exclude()
  firstName: string;

  @Prop({ maxlength: 50, required: true, trim: true, uppercase: true })
  @Exclude()
  lastName: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @Prop({
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @ApiProperty({ example: 'Admin' })
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    enum: Role,
    default: Role.GUEST,
  })
  role: Role;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  lastAccessedOn: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre<UserDocument>('save', function (next: Function) {
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err: Error, hash: string) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } catch (err) {
    next(err);
  }
});

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
