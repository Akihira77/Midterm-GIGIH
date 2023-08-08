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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const product_routes_1 = __importDefault(require("./routers/product.routes"));
const video_routes_1 = __importDefault(require("./routers/video.routes"));
const seed_1 = require("./seed");
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Db Connected");
    StartServer();
})
    .catch((error) => {
    console.log("Unable to connect", error);
});
const StartServer = () => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, compression_1.default)());
    app.post("/api/seed-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seed_1.SeedDataUser)();
        yield (0, seed_1.SeedDataProduct)();
        yield (0, seed_1.SeedDataVideo)();
        yield (0, seed_1.SeedDataThumbnail)();
        yield (0, seed_1.SeedDataComment)();
        return res.status(201).send({ message: "Seeding data is success" });
    }));
    app.use("/api/users", user_routes_1.default);
    app.use("/api/products", product_routes_1.default);
    app.use("/api/videos", video_routes_1.default);
    app.get("/", (req, res) => res.send("Hello world"));
    const PORT = Number(process.env.SERVER_PORT);
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
//# sourceMappingURL=index.js.map