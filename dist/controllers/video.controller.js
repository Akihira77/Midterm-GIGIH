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
exports.GetThumbnailFromVideo = exports.AddThumbnail = exports.GetAllThumbnail = exports.Create = exports.GetAll = void 0;
const video_service_1 = __importDefault(require("../services/repositories/video.service"));
const videoThumbnail_service_1 = __importDefault(require("../services/repositories/videoThumbnail.service"));
const video_mapping_1 = require("../services/mapping/video.mapping");
const GetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield video_service_1.default.GetAll();
        return res.status(200).send({ data: { videos: yield (0, video_mapping_1.videoMap)(results) } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "Something has happend", error: error });
    }
});
exports.GetAll = GetAll;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield video_service_1.default.Create(req.body);
        yield result.save();
        return res.status(201).send({ data: { video: result } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "Something has happend", error: error });
    }
});
exports.Create = Create;
const GetAllThumbnail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnails = yield videoThumbnail_service_1.default.GetAll();
        return res
            .status(200)
            .send({ data: { thumbnails: yield (0, video_mapping_1.thumbnailMap)(thumbnails) } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "Something has happend", error: error });
    }
});
exports.GetAllThumbnail = GetAllThumbnail;
const AddThumbnail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnail = yield videoThumbnail_service_1.default.GetByVideoId(req.params.videoId);
        if (thumbnail == null) {
            const savedThumbnail = yield videoThumbnail_service_1.default.Create({
                videoId: req.params.videoId,
                urlImage: req.body.urlImage,
            });
            const result = yield savedThumbnail.save();
            return res.status(201).send({ data: { thumbnail: result } });
        }
        const addedThumbnail = yield videoThumbnail_service_1.default.AddThumbnail(req.params.videoId, req.body.urlImage);
        return res.status(200).send({ data: { thumbnails: addedThumbnail } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "Something has happend", error: error });
    }
});
exports.AddThumbnail = AddThumbnail;
const GetThumbnailFromVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnails = yield videoThumbnail_service_1.default.GetByVideoId(req.params.videoId);
        if (thumbnails == null) {
            return res.status(404).send({ message: "Video does not exists" });
        }
        const result = {
            videoId: thumbnails.videoId,
            urlImage: thumbnails.urlImage,
        };
        return res.status(200).send({ data: { thumbnails: result } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "Something has happend", error: error });
    }
});
exports.GetThumbnailFromVideo = GetThumbnailFromVideo;
//# sourceMappingURL=video.controller.js.map