import { Request, Response } from "express";
import { VideoDocument } from "../models/video.model";
import VideoService from "../services/video.service";
import VideoThumbnailService from "../services/videoThumbnail.service";

export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await VideoService.GetAll();
    return res.status(200).send({ data: results });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Create = async (
  req: Request<{}, {}, VideoDocument>,
  res: Response
) => {
  try {
    const result = await VideoService.Create(req.body);

    await result.save();
    return res.status(201).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetAllThumbnail = async (req: Request, res: Response) => {
  try {
    const thumbnails = await VideoThumbnailService.GetAll();
    const result = thumbnails.map((thumbnail) => {
      return { videoId: thumbnail.videoId, urlImage: thumbnail.urlImage };
    });

    return res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
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
      return res.status(201).send({ data: result });
    }

    const addedThumbnail = await VideoThumbnailService.AddThumbnail(
      req.params.videoId,
      req.body.urlImage
    );

    return res.status(200).send({ data: addedThumbnail });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
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
    return res.status(200).send({ data: thumbnails });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
