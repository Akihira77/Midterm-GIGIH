import { Request, Response } from "express";
import VideoService from "../services/video.service";
import UserCommentService from "../services/userComment.service";
import UserService from "../services/user.service";

export const SubmitComment = async (
  req: Request<{ videoId: string }, {}, { username: string; comment: string }>,
  res: Response
) => {
  try {
    const video = await VideoService.GetById(req.params.videoId);
    if (video == null) {
      return res.status(404).send({ message: "Video did not exists" });
    }

    if ((await UserService.GetByName(req.body.username)) == null) {
      return res.status(404).send({ message: "User did not exists" });
    }

    const result = await UserCommentService.SubmitComment({
      productId: video.productId,
      username: req.body.username,
      comment: req.body.comment,
    });

    await result.save();

    return res.status(200).send({ data: result });
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
      return res.status(404).send({ message: "Video did not exists" });
    }

    const comments = await UserCommentService.GetAllByProductId(
      video.productId
    );
    const result = comments.map((comment) => {
      return {
        username: comment.username,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });

    return res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
