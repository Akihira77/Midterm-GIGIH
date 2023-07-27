import express, { Router } from "express";
import * as VideoController from "../controllers/video.controller";
import validatorObjectId from "../middleware/validatorObjectId.middleware";

const VideoRoutes: Router = express();

VideoRoutes.get("/", VideoController.GetAll);
VideoRoutes.get("/thumbnails", VideoController.GetAllThumbnail);
VideoRoutes.get(
  "/thumbnails/:videoId",
  validatorObjectId("videoId"),
  VideoController.GetThumbnailFromVideo
);
VideoRoutes.post("/", VideoController.Create);
VideoRoutes.post(
  "/thumbnails/:videoId",
  validatorObjectId("videoId"),
  VideoController.AddThumbnail
);

export default VideoRoutes;
