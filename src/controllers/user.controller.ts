import { UserDocument } from "./../models/user.model";
import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { isValidObjectId } from "mongoose";

export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await UserService.GetAll();
    const data = results.map((result) => {
      return { username: result.username };
    });

    return res.status(200).send({ data: data });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "User Id is not valid" });
    }

    const result = await UserService.GetById(req.params.id);
    if (result == null) {
      return res.status(404).send({ message: "User did not exists" });
    }

    return res.status(200).send({ data: result.username });
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Delete = async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "User Id is not valid" });
    }

    const user = await UserService.Delete(req.params.id);
    if (user == null) {
      return res.status(404).send({ message: "User did not exists" });
    }
    return res.status(200).send({ user });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Update = async (
  req: Request<{ id: string }, {}, Pick<UserDocument, "password">>,
  res: Response
) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "User Id is not valid" });
    }

    const user = await UserService.Update(req.params.id, req.body.password);
    if (user == null) {
      return res.status(404).send({ message: "User did not exists" });
    }

    return res
      .status(200)
      .send({ data: { username: user.username, password: user.password } });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
