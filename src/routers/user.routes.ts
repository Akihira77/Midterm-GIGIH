import express, { Router } from "express";

// Controller
import * as UserController from "../controllers/user.controller";
import validatorObjectId from "../middleware/validatorObjectId.middleware";

const UserRoutes: Router = express();

UserRoutes.get("/", UserController.GetAll);
UserRoutes.get("/:id", validatorObjectId("id"), UserController.GetById);
UserRoutes.post("/", UserController.Create);
UserRoutes.delete("/:id", validatorObjectId("id"), UserController.Delete);
UserRoutes.put("/:id", validatorObjectId("id"), UserController.Update);

UserRoutes.get("/comments/get-all", UserController.GetAllUserComments);
UserRoutes.get(
  "/comments/get-comment-from-video/:videoId",
  validatorObjectId("videoId"),
  UserController.GetAllByVideoId
);
UserRoutes.post(
  "/comments/submit-comment/:videoId",
  validatorObjectId("videoId"),
  UserController.SubmitComment
);

export default UserRoutes;
