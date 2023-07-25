import express, { Router } from "express";
import * as VideoController from "../controllers/video.controller";

const VideoRoutes: Router = express();

VideoRoutes.get("/", VideoController.GetAll);
VideoRoutes.get("/get-thumbnail-list", VideoController.GetAllThumbnail);
VideoRoutes.get(
  "/get-thumbnail-from-video/:videoId",
  VideoController.GetThumbnailFromVideo
);
VideoRoutes.post("/", VideoController.Create);
VideoRoutes.post("/add-thumbnail/:videoId", VideoController.AddThumbnail);

export default VideoRoutes;
