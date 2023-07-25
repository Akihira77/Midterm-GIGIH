import { UserCommentDocument } from "../../models/userComment.model";
import UserCommentModel from "../../models/userComment.model";
import { BaseService } from "./base.service";

class UserCommentService extends BaseService {
  SubmitComment = async (input: UserCommentDocument) => {
    return this._model.create(input);
  };

  GetAllByProductId = async (productId: string) => {
    return this._model.find({ productId: productId });
  };
}

export default new UserCommentService(UserCommentModel);
