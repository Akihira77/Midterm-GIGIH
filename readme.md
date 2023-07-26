# REST APIs Typescript

**index.ts**

```TS
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
  app.use("/api/products", ProductRoutes);
  app.use("/api/videos", VideoRoutes);

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
};
```

**The structure of this APIs is Routes -> Controller -> Service -> Model**

## Seeding Data

You can do this seeding data and after that you can test or use this API

- **seed.ts**

```TS
export const SeedDataUser = async () => {
  const data: UserDocument[] = [
    { username: "andikawa123@gmail.com", password: "andikawa" },
    { username: "dikawa123@gmail.com", password: "dikawa" },
    { username: "awawa123@gmail.com", password: "awaawa" },
  ];

  await UserModel.insertMany(data);
};

export const SeedDataProduct = async () => {
  const data: ProductDocument[] = [
    {
      title: "The Lord Of The Rings",
      price: 129000,
      url: "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings",
    },
    {
      title: "The Laws Of Human Nature",
      price: 150000,
      url: "https://www.junkybooks.com/book/the-laws-of-human-nature",
    },
    {
      title: "Energy Project Financing",
      price: 229000,
      url: "https://www.junkybooks.com/book/energy-project-financing",
    },
  ];

  await ProductModel.insertMany(data);
};

export const SeedDataVideo = async () => {
  const products = await ProductModel.find();

  const data: VideoDocument[] = [
    { productId: products[0].id, url: "https://youtu.be/_oOtUsfqo0w" },
    { productId: products[1].id, url: "https://youtu.be/_oOtUsfqo0w" },
    { productId: products[2].id, url: "https://youtu.be/_oOtUsfqo0w" },
  ];

  await VideoModel.insertMany(data);
};

export const SeedDataThumbnail = async () => {
  const videos = await VideoModel.find();

  const data: VideoThumbnailDocument[] = [
    {
      videoId: videos[0].id,
      urlImage: [
        "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
        "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
      ],
    },
    {
      videoId: videos[1].id,
      urlImage: [
        "https://www.junkybooks.com/administrator/bookimages/647357233721b7.17593093.jpg",
        "https://www.junkybooks.com/administrator/bookimages/647357233721b7.17593093.jpg",
      ],
    },
    {
      videoId: videos[2].id,
      urlImage: [
        "https://www.junkybooks.com/administrator/bookimages/644599e3001414.84971677.jpg",
        "https://www.junkybooks.com/administrator/bookimages/644599e3001414.84971677.jpg",
      ],
    },
  ];

  await VideoThumbnailModel.insertMany(data);
};

export const SeedDataComment = async () => {
  const products = await ProductModel.find();

  const data: UserCommentDocument[] = [
    {
      username: "andikawa123@gmail.com",
      productId: products[0].id,
      comment: "This book is very good",
    },
    {
      username: "dikawa123@gmail.com",
      productId: products[1].id,
      comment: "This book is very good",
    },
    {
      username: "andikawa123@gmail.com",
      productId: products[2].id,
      comment: "This book is very good",
    },
  ];

  await UserCommentModel.insertMany(data);
};
```

## Features

### Base

#### Service

- **base.service.ts**

```TS
export class BaseService {
  constructor(protected readonly _model: typeof Model) {}

  GetAll = async (populate?: string) => {
    return await this._model.find().populate(populate || []);
  };

  GetById = async (id: string, populate?: string) => {
    return await this._model.findById(id).populate(populate || []);
  };

  Create = async (input: unknown) => {
    return await this._model.create(input);
  };

  Delete = async (id: string) => {
    return await this._model.findByIdAndDelete(id);
  };
}
```

### User

#### Routes

- **user.routes.ts**

```TS
UserRoutes.get("/", UserController.GetAll);
UserRoutes.get("/:id", UserController.GetById);
UserRoutes.post("/", UserController.Create);
UserRoutes.delete("/:id", UserController.Delete);
UserRoutes.put("/:id", UserController.Update);
```

#### Controller

- **user.controller.ts**

```TS
export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await UserService.GetAll();

    return res.status(200).send({ data: await userMap(results) });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "User Id is not valid" });
    }

    const result = await UserService.GetById(req.params.id);
    if (result == null) {
      return res.status(404).send({ message: "User did not exists" });
    }

    return res.status(200).send({ data: result.username });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Create = async (
  req: Request<{}, {}, UserDocument>,
  res: Response
) => {
  try {
    const userExists = await UserService.GetByName(req.body.username);
    if (userExists != null) {
      return res.status(400).send({ message: "User is already exists" });
    }

    const user = await UserService.Create(req.body);
    await user.save();

    return res.status(201).send({ data: user });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Delete = async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "User Id is not valid" });
    }

    const user = await UserService.Delete(req.params.id);
    if (user == null) {
      return res.status(404).send({ message: "User did not exists" });
    }
    return res.status(200).send({ user });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Update = async (
  req: Request<{ id: string }, {}, Pick<UserDocument, "password">>,
  res: Response
) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "User Id is not valid" });
    }

    const user = await UserService.Update(req.params.id, req.body.password);
    if (user == null) {
      return res.status(404).send({ message: "User did not exists" });
    }

    return res
      .status(200)
      .send({ data: { username: user.username, password: user.password } });
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const SubmitComment = async (
  req: Request<{ videoId: string }, {}, { username: string; comment: string }>,
  res: Response
) => {
  try {
    const video = await VideoService.GetById(req.params.videoId);
    if (video == null) {
      return res.status(404).send({ message: "Video did not exists" });
    }

    if ((await UserService.GetByName(req.body.username)) == null) {
      return res.status(404).send({ message: "User did not exists" });
    }

    const result = await UserCommentService.SubmitComment({
      productId: video.productId,
      username: req.body.username,
      comment: req.body.comment,
    });

    await result.save();

    return res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetAllByVideoId = async (
  req: Request<{ videoId: string }>,
  res: Response
) => {
  try {
    const video = await VideoService.GetById(req.params.videoId);
    if (video == null) {
      return res.status(404).send({ message: "Video did not exists" });
    }

    const comments = await UserCommentService.GetAllByProductId(
      video.productId
    );

    return res.status(200).send({ data: await commentMapping(comments) });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
```

#### Service

##### Repository

- **user.service.ts**

```TS
class UserService extends BaseService {
  GetByName = async (name: string) => {
    return await this._model.findOne({ username: name });
  };

  Update = async (id: string, password: string) => {
    return await this._model.findByIdAndUpdate(
      id,
      {
        $set: { password: password },
      },
      { returnDocument: "after" }
    );
  };
}
```

- **userComment.service.ts**

```TS
class UserCommentService extends BaseService {
  SubmitComment = async (input: UserCommentDocument) => {
    return this._model.create(input);
  };

  GetAllByProductId = async (productId: string) => {
    return this._model.find({ productId: productId });
  };
}
```

##### Mapping

- **user.mapping.ts**

```TS
const userMap = async (data: any[]): Promise<UserDTO[]> => {
  const userDtos: UserDTO[] = data.map((e) => {
    return { username: e.username };
  });

  return userDtos;
};
```

#### Model

- **user.model.ts**

```TS
interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = Pick<IUser, "username" | "password">;
export type UserDTO = Pick<IUser, "username">;

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", UserSchema);
```

- **userComment.model.ts**

```TS
interface IUserComment extends Document {
  username: string;
  productId: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCommentDocument = Pick<
  IUserComment,
  "username" | "productId" | "comment"
>;

export type UserCommentDTO = Pick<
  IUserComment,
  "username" | "comment" | "createdAt" | "updatedAt"
>;

const UserCommentSchema = new Schema<IUserComment>(
  {
    username: { type: String, required: true },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ProductModel,
    },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserCommentModel = model<IUserComment>("UserComment", UserCommentSchema);
```

### Video

#### Routes

- **video.routes.ts**

```TS
VideoRoutes.get("/", VideoController.GetAll);
VideoRoutes.get("/get-thumbnail-list", VideoController.GetAllThumbnail);
VideoRoutes.get(
  "/get-thumbnail-from-video/:videoId",
  VideoController.GetThumbnailFromVideo
);
VideoRoutes.post("/", VideoController.Create);
VideoRoutes.post("/add-thumbnail/:videoId", VideoController.AddThumbnail);
```

#### Controller

- **video.controller.ts**

```TS
export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await VideoService.GetAll();

    return res.status(200).send({ data: await videoMap(results) });
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

    return res.status(200).send({ data: await thumbnailMap(thumbnails) });
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

    const result: VideoThumbnailDTO = {
      videoId: thumbnails.videoId,
      urlImage: thumbnails.urlImage,
    };

    return res.status(200).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
```

#### Service

##### Repository

- **video.service.ts**

```TS
class VideoService extends BaseService {}
```

- **videoThumbnail.service.ts**

```TS
class VideoThumbnailService extends BaseService {
  AddThumbnail = async (videoId: string, urlImage: string) => {
    return await this._model.updateOne(
      { videoId: videoId },
      { $push: { urlImage: urlImage } },
      { returnDocument: "after" }
    );
  };

  GetByVideoId = async (videoId: string) => {
    return await this._model.findOne({ videoId: videoId });
  };
}
```

##### Mapping

- **video.mapping.ts**

```TS
export const thumbnailMap = async (
  data: any[]
): Promise<VideoThumbnailDTO[]> => {
  const videoThumbnailDtos: VideoThumbnailDTO[] = data.map((e) => {
    return { videoId: e.videoId, urlImage: e.urlImage };
  });

  return videoThumbnailDtos;
};

export const videoMap = async (data: any[]): Promise<VideoDTO[]> => {
  const videoDtos: VideoDTO[] = data.map((e) => {
    return { productId: e.productId, url: e.url };
  });

  return videoDtos;
};
```

#### Model

- **video.model.ts**

```TS
interface IVideo extends Document {
  productId: Schema.Types.ObjectId;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export type VideoDocument = Pick<IVideo, "productId" | "url">;
export type VideoDTO = Pick<IVideo, "productId" | "url">;

const VideoSchema = new Schema<IVideo>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ProductModel,
    },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
```

- **videoThumbnail.model.ts**

```TS
interface IVideoThumbnail extends Document {
  videoId: Schema.Types.ObjectId;
  urlImage: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type VideoThumbnailDocument = Pick<
  IVideoThumbnail,
  "videoId" | "urlImage"
>;

export type VideoThumbnailDTO = Pick<IVideoThumbnail, "videoId" | "urlImage">;

const VideoThumbnailSchema = new Schema<IVideoThumbnail>({
  videoId: { type: Schema.Types.ObjectId, required: true, ref: VideoModel },
  urlImage: [{ type: String, required: true }],
});

const VideoThumbnailModel = model<IVideoThumbnail>(
  "VideoThumbnail",
  VideoThumbnailSchema
);
```

### Product

#### Routes

- **product.routes.ts**

```TS
ProductRoutes.get("/", ProductController.GetAll);
ProductRoutes.get(
  "/get-product-list-by-videoId/:videoId",
  ProductController.GetAllByVideoId
);
ProductRoutes.post("/", ProductController.Create);
```

#### Controller

- **product.controller.ts**

```TS
export const GetAll = async (req: Request, res: Response) => {
  try {
    const results = await ProductService.GetAll();

    return res.status(200).send({ data: await productMap(results) });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const Create = async (
  req: Request<{}, {}, ProductDocument>,
  res: Response
) => {
  try {
    const result = await ProductService.Create(req.body);

    await result.save();
    return res.status(201).send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};

export const GetAllByVideoId = async (
  req: Request<{ videoId: string }>,
  res: Response
) => {
  try {
    const video = await VideoService.GetById(req.params.videoId);
    if (video == null) {
      return res.status(404).send({ message: "Video id is not valid" });
    }

    const products = await ProductService.GetAllById(video.productId);

    return res.status(200).send({ data: await videoProductMap(products) });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error });
  }
};
```

#### Service

##### Repository

- **product.service.ts**

```TS
class ProductService extends BaseService {
  GetAllById = async (productId: string) => {
    return await this._model.find({ _id: productId });
  };
}
```

##### Mapping

- **product.mapping.ts**

```TS
export const productMap = async (data: any[]): Promise<ProductDTO[]> => {
  const productDtos: ProductDTO[] = data.map((e) => {
    return { title: e.title, price: e.price, url: e.url };
  });

  return productDtos;
};

export const videoProductMap = async (
  data: any[]
): Promise<VideoProductDTO[]> => {
  const videoProductDtos: VideoProductDTO[] = data.map((e) => {
    return { id: e._id, title: e.title, price: e.price, url: e.url };
  });

  return videoProductDtos;
};
```

#### Model

- **product.model.ts**

```TS
interface IProduct extends Document {
  title: string;
  price: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductDocument = Pick<IProduct, "title" | "price" | "url">;
export type ProductDTO = Pick<IProduct, "title" | "price" | "url">;
export type VideoProductDTO = Pick<IProduct, "id" | "title" | "price" | "url">;

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", ProductSchema);
```
