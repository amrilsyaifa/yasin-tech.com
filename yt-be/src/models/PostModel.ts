import { Document, model, Schema } from "mongoose";

export type TPost = {
  slug: string;
  title: string;
  author: string;
  description: string;
  thumbnail?: string;
  for_show?: boolean;
  tags: string[];
  status: "draft" | "publish";
};

export interface IPost extends TPost, Document {}

const postSchema: Schema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  for_show: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["draft", "publish"],
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
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

const Post = model<IPost>("Post", postSchema);

export default Post;
