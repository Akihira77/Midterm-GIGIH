import { Request, Response } from "express";
import { ProductDocument } from "../models/product.model";

// Services
import ProductService from "../services/repositories/product.service";
import VideoService from "../services/repositories/video.service";
import {
  productMap,
  videoProductMap,
} from "../services/mapping/product.mapping";

export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await ProductService.GetAll();

    return res.status(200).send({ data: await productMap(results) });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Create = async (
  req: Request<{}, {}, ProductDocument>,
  res: Response
) => {
  try {
    const result = await ProductService.Create(req.body);

    await result.save();
    return res.status(201).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetAllByVideoId = async (
  req: Request<{ videoId: string }>,
  res: Response
) => {
  try {
    const video = await VideoService.GetById(req.params.videoId);
    if (video == null) {
      return res.status(404).send({ message: "Video id is not valid" });
    }

    const products = await ProductService.GetAllById(video.productId);

    return res.status(200).send({ data: await videoProductMap(products) });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
