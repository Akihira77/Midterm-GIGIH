"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedDataComment = exports.SeedDataThumbnail = exports.SeedDataVideo = exports.SeedDataProduct = exports.SeedDataUser = void 0;
const product_model_1 = __importDefault(require("./models/product.model"));
const user_model_1 = __importDefault(require("./models/user.model"));
const userComment_model_1 = __importDefault(require("./models/userComment.model"));
const video_model_1 = __importDefault(require("./models/video.model"));
const videoThumbnail_model_1 = __importDefault(require("./models/videoThumbnail.model"));
const SeedDataUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
        { username: "andikawa123@gmail.com", password: "andikawa" },
        { username: "dikawa123@gmail.com", password: "dikawa" },
        { username: "awawa123@gmail.com", password: "awaawa" },
    ];
    yield user_model_1.default.insertMany(data);
});
exports.SeedDataUser = SeedDataUser;
const SeedDataProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = [
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
    yield product_model_1.default.insertMany(data);
});
exports.SeedDataProduct = SeedDataProduct;
const SeedDataVideo = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find();
    const data = [
        { productId: products[0].id, url: "https://youtu.be/_oOtUsfqo0w" },
        { productId: products[1].id, url: "https://youtu.be/_oOtUsfqo0w" },
        { productId: products[2].id, url: "https://youtu.be/_oOtUsfqo0w" },
    ];
    yield video_model_1.default.insertMany(data);
});
exports.SeedDataVideo = SeedDataVideo;
const SeedDataThumbnail = () => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield video_model_1.default.find();
    const data = [
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
    yield videoThumbnail_model_1.default.insertMany(data);
});
exports.SeedDataThumbnail = SeedDataThumbnail;
const SeedDataComment = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find();
    const data = [
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
    yield userComment_model_1.default.insertMany(data);
});
exports.SeedDataComment = SeedDataComment;
//# sourceMappingURL=seed.js.map