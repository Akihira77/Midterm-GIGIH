import express, { Router } from "express";

// Controller
import * as UserController from "../controllers/user.controller";

const UserRoutes: Router = express();

UserRoutes.get("/", UserController.GetAll);
UserRoutes.get("/:id", UserController.GetById);
UserRoutes.post("/", UserController.Create);
UserRoutes.delete("/:id", UserController.Delete);
UserRoutes.put("/:id", UserController.Update);

UserRoutes.get(
  "/get-comment-from-video/:videoId",
  UserController.GetAllByVideoId
);
UserRoutes.post("/submit-comment/:videoId", UserController.SubmitComment);

export default UserRoutes;
