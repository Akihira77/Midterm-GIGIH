import { Request, Response } from "express";
import { VideoDocument } from "../models/video.model";
import VideoService from "../services/repositories/video.service";
import VideoThumbnailService from "../services/repositories/videoThumbnail.service";
import { thumbnailMap, videoMap } from "../services/mapping/video.mapping";
import { VideoThumbnailDTO } from "../models/videoThumbnail.model";

export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await VideoService.GetAll();

    return res.status(200).send({ data: { videos: await videoMap(results) } });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Something has happend", error: error });
  }
};

export const Create = async (
  req: Request<{}, {}, VideoDocument>,
  res: Response
) => {
  try {
    const result = await VideoService.Create(req.body);

    await result.save();
    return res.status(201).send({ data: { video: result } });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Something has happend", error: error });
  }
};

export const GetAllThumbnail = async (req: Request, res: Response) => {
  try {
    const thumbnails = await VideoThumbnailService.GetAll();

    return res
      .status(200)
      .send({ data: { thumbnails: await thumbnailMap(thumbnails) } });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Something has happend", error: error });
  }
};

export const AddThumbnail = async (
  req: Request<{ videoId: string }, {}, { urlImage: string }>,
  res: Response
) => {
  try {
    const thumbnail: unknown = await VideoThumbnailService.GetByVideoId(
      req.params.videoId
    );

    if (thumbnail == null) {
      const savedThumbnail = await VideoThumbnailService.Create({
        videoId: req.params.videoId,
        urlImage: req.body.urlImage,
      });

      const result: unknown = await savedThumbnail.save();
      return res.status(201).send({ data: { thumbnail: result } });
    }

    const addedThumbnail = await VideoThumbnailService.AddThumbnail(
      req.params.videoId,
      req.body.urlImage
    );

    return res.status(200).send({ data: { thumbnails: addedThumbnail } });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Something has happend", error: error });
  }
};

export const GetThumbnailFromVideo = async (
  req: Request<{ videoId: string }>,
  res: Response
) => {
  try {
    const thumbnails = await VideoThumbnailService.GetByVideoId(
      req.params.videoId
    );

    if (thumbnails == null) {
      return res.status(404).send({ message: "Video does not exists" });
    }

    const result: VideoThumbnailDTO = {
      videoId: thumbnails.videoId,
      urlImage: thumbnails.urlImage,
    };

    return res.status(200).send({ data: { thumbnails: result } });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Something has happend", error: error });
  }
};
