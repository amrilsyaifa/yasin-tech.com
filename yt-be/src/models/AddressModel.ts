import { Document, model, Schema } from "mongoose";

export type TAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  profile: string;
};

export interface IAddress extends TAddress, Document {}

const addressSchema: Schema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
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

const Address = model<IAddress>("Address", addressSchema);

export default Address;
