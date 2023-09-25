import { Document, model, Schema } from "mongoose";

export type TUserTemp = {
  email: string;
  phone_number: string;
  username: string;
  first_name: string;
  last_name?: string;
  image?: string;
};

export interface IUserTemp extends TUserTemp, Document {}

const userTempSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  phone_number: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  image: {
    type: String,
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

const UserTemp = model<IUserTemp>("UserTemp", userTempSchema);

export default UserTemp;
