import { Document, model, Schema } from "mongoose";
import { IType } from "./UploadFileModel";

export type TUploadFileTemp = {
  name: string;
  slug: string;
  type: IType;
  author: string;
};

export interface IUploadFileTemp extends TUploadFileTemp, Document {}

const uploadFileTempSchema: Schema = new Schema({
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

const UploadFileTemp = model<IUploadFileTemp>(
  "UploadFileTemp",
  uploadFileTempSchema
);

export default UploadFileTemp;
