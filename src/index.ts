import express, { Application } from "express";
import dotnev from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
dotnev.config();

// Import Routes
import UserRoutes from "./routers/user.routes";

const app: Application = express();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Db Connected");
    StartServer();
  })
  .catch((error: Error) => {
    console.log("Unable to connect", error);
  });

const StartServer = () => {
  // Midlleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(compression());
  app.use(morgan("dev"));

  // Routes
  app.use("/api/users", UserRoutes);

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
};
