import { Model } from "mongoose";

export class BaseService {
  constructor(protected readonly _model: typeof Model) {}

  GetAll = async (populate?: string) => {
    return await this._model.find().populate(populate || []);
  };

  GetById = async (id: string, populate?: string) => {
    return await this._model.findById(id).populate(populate || []);
  };

  Create = async (input: unknown) => {
    return await this._model.create(input);
  };

  Delete = async (id: string) => {
    return await this._model.findByIdAndDelete(id);
  };
}
