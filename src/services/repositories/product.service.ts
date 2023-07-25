import ProductModel from "../../models/product.model";
import { BaseService } from "./base.service";

class ProductService extends BaseService {
  GetAllById = async (productId: string) => {
    return await this._model.find({ _id: productId });
  };
}

export default new ProductService(ProductModel);
