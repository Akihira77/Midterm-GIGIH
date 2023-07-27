import express, { Router } from "express";

// Controller
import * as ProductController from "../controllers/product.controller";
import validatorObjectId from "../middleware/validatorObjectId.middleware";

const ProductRoutes: Router = express();

ProductRoutes.get("/", ProductController.GetAll);
ProductRoutes.get(
  "/get-product-list-by-videoId/:videoId",
  validatorObjectId("videoId"),
  ProductController.GetAllByVideoId
);
ProductRoutes.post("/", ProductController.Create);

export default ProductRoutes;
