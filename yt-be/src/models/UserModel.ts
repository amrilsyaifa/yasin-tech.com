import { Document, model, Schema } from "mongoose";

export type TUser = {
  profile: string;
  email: string;
  password: string;
  username: string;
  verified_email?: boolean;
  last_login?: Date;
  role: string;
};

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified_email: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  last_login: {
    type: Date,
    default: new Date(),
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

const User = model<IUser>("User", userSchema);

export default User;
