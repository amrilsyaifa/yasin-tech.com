import { Document, model, Schema } from "mongoose";

export type TProfile = {
  phone_number: string;
  first_name: string;
  last_name?: string;
  image?: string;
};

export interface IProfile extends TProfile, Document {}

export const profileSchema: Schema = new Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true,
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

  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
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

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
