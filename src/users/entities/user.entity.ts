import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
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
  @Prop({
    unique: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true,
  })
  username: string;

  //Method Functions
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

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  lastAccessedOn: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
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
