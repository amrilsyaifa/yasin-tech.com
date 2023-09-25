import { Document, model, Schema } from "mongoose";

export type TTestimony = {
  name: string;
  company: string;
  job_title: string;
  desc_ID: string;
  desc_EN: string;
  rating: string;
  image?: string;
  author: string;
  status: "draft" | "publish";
};

export interface ITestimony extends TTestimony, Document {}

const testimonySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  desc_ID: {
    type: String,
    required: true,
  },
  desc_EN: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["draft", "publish"],
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

const Testimony = model<ITestimony>("Testimony", testimonySchema);

export default Testimony;
