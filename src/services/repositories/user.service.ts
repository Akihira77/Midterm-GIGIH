import UserModel from "../../models/user.model";
import { BaseService } from "./base.service";

class UserService extends BaseService {
  GetByName = async (name: string) => {
    return await this._model.findOne({ username: name });
  };

  Update = async (id: string, password: string) => {
    return await this._model.findByIdAndUpdate(
      id,
      {
        $set: { password: password },
      },
      { returnDocument: "after" }
    );
  };
}

export default new UserService(UserModel);
