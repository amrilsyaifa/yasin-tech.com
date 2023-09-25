import { Document, model, Schema } from "mongoose";

export type IType = "doc" | "file" | "image";

export type TUploadFile = {
  name: string;
  slug: string;
  type: IType;
  author: string;
};

export interface IUploadFile extends TUploadFile, Document {}

const uploadFileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["doc", "file", "image"],
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const UploadFile = model<IUploadFile>("UploadFile", uploadFileSchema);

export default UploadFile;
