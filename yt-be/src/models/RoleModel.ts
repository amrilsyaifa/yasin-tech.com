import { Document, model, Schema } from "mongoose";

export type TRole = {
  title: string;
  slug: string;
  description?: string;
};

export interface IRole extends TRole, Document {}

const roleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
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

const Role = model<IRole>("Role", roleSchema);

export default Role;
