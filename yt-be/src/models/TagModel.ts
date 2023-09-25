import { Document, model, Schema } from "mongoose";

export type TTag = {
  slug: string;
  name: string;
  status: "draft" | "publish";
};

export interface ITag extends TTag, Document {}

const tagSchema: Schema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "publish"],
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

const Tag = model<ITag>("Tag", tagSchema);

export default Tag;
