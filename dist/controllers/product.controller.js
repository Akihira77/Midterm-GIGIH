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
exports.GetAllByVideoId = exports.Create = exports.GetAll = void 0;
const product_service_1 = __importDefault(require("../services/repositories/product.service"));
const video_service_1 = __importDefault(require("../services/repositories/video.service"));
const product_mapping_1 = require("../services/mapping/product.mapping");
const GetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield product_service_1.default.GetAll();
        return res
            .status(200)
            .send({ data: { products: yield (0, product_mapping_1.productMap)(results) } });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ error });
    }
});
exports.GetAll = GetAll;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.default.Create(req.body);
        yield result.save();
        return res.status(201).send({ data: { product: result } });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ error });
    }
});
exports.Create = Create;
const GetAllByVideoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_service_1.default.GetById(req.params.videoId);
        if (video == null) {
            return res.status(404).send({ message: "Video does not exists" });
        }
        const products = yield product_service_1.default.GetAllById(video.productId);
        return res
            .status(200)
            .send({ data: { products: yield (0, product_mapping_1.videoProductMap)(products) } });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ error });
    }
});
exports.GetAllByVideoId = GetAllByVideoId;
//# sourceMappingURL=product.controller.js.map