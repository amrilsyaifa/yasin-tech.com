import { Document, model, Schema } from "mongoose";

export type TComment = {
  comment: string;
  post: string;
};

export interface IComment extends TComment, Document {}

const commentSchema: Schema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
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

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
