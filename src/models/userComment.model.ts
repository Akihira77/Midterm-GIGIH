import mongoose, { model, Document, Schema } from "mongoose";
import ProductModel from "./product.model";

interface IUserComment extends Document {
  username: string;
  productId: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCommentDocument = Pick<
  IUserComment,
  "username" | "productId" | "comment"
>;

const UserSchema = new Schema<IUserComment>(
  {
    username: { type: String, required: true },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ProductModel,
    },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUserComment>("User", UserSchema);

export default UserModel;
