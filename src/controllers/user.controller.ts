import { UserDocument } from "./../models/user.model";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import * as UserService from "../services/user.service";

export const GetAll = async (req: Request, res: Response) => {
  try {
    const result = await UserService.GetAll();
    return res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetById = async (req: Request, res: Response) => {
  try {
    const result = await UserService.GetById(req.params.id);
    return res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Create = async (
  req: Request<{}, {}, UserDocument>,
  res: Response
) => {
  try {
    const userExists = await UserService.GetByName(req.body.username);
    if (userExists != null) {
      return res.status(400).send({ message: "User is already exists" });
    }

    const user = await UserService.Create({ ...req.body });
    await user.save();

    return res.status(201).send({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const user = await UserService.Delete(req.params.id);
    if (user == null) {
      return res.status(404).send({ message: "User did not exists" });
    }
    return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
