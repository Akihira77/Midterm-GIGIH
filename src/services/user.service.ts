import UserModel, { UserDocument } from "../models/user.model";

export const GetAll = async () => {
  return await UserModel.find();
};

export const GetById = async (id: string) => {
  return await UserModel.findById(id);
};

export const GetByName = async (name: string) => {
  return await UserModel.findOne({ username: name });
};

export const Create = async (data: UserDocument) => {
  return await UserModel.create(data);
};

export const Delete = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

export const Update = async (id: string, password: string) => {
  return await UserModel.findByIdAndUpdate(
    id,
    {
      $set: { password: password },
    },
    { returnDocument: "after" }
  );
};
