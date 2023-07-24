import express, { Router } from "express";

// Controller
import * as UserController from "../controllers/user.controller";

const UserRoutes: Router = express();

UserRoutes.get("/", UserController.GetAll);
UserRoutes.get("/:id", UserController.GetById);
UserRoutes.post("/", UserController.Create);
UserRoutes.delete("/:id", UserController.Delete);

export default UserRoutes;
