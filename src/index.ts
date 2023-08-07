import express, { Application } from "express";
import dotnev from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
dotnev.config();

// Import Routes
import UserRoutes from "./routers/user.routes";
import ProductRoutes from "./routers/product.routes";
import VideoRoutes from "./routers/video.routes";
import {
  SeedDataComment,
  SeedDataProduct,
  SeedDataThumbnail,
  SeedDataUser,
  SeedDataVideo,
} from "./seed";

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

  // Seeding data
  app.post("/api/seed-data", async (req, res) => {
    await SeedDataUser();
    await SeedDataProduct();
    await SeedDataVideo();
    await SeedDataThumbnail();
    await SeedDataComment();

    return res.status(201).send({ message: "Seeding data is success" });
  });

  // Routes
  app.use("/api/users", UserRoutes);
  app.use("/api/products", ProductRoutes);
  app.use("/api/videos", VideoRoutes);

  const PORT = process.env.SERVER_PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
