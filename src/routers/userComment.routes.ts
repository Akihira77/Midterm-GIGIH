import express, { Router } from "express";

// Controller
import * as UserCommentController from "../controllers/userComment.controller";

const UserCommentRoutes: Router = express();

UserCommentRoutes.get(
  "/get-comment-from-video/:videoId",
  UserCommentController.GetAllByVideoId
);
UserCommentRoutes.post(
  "/submit-comment/:videoId",
  UserCommentController.SubmitComment
);

export default UserCommentRoutes;
