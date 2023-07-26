import ProductModel, { ProductDocument } from "./models/product.model";
import UserModel, { UserDocument } from "./models/user.model";
import UserCommentModel, {
  UserCommentDocument,
} from "./models/userComment.model";
import VideoModel, { VideoDocument } from "./models/video.model";
import VideoThumbnailModel, {
  VideoThumbnailDocument,
} from "./models/videoThumbnail.model";

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
