"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const video_model_1 = __importDefault(require("./video.model"));
const VideoThumbnailSchema = new mongoose_1.Schema({
    videoId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: video_model_1.default },
    urlImage: [{ type: String, required: true }],
});
const VideoThumbnailModel = (0, mongoose_1.model)("VideoThumbnail", VideoThumbnailSchema);
exports.default = VideoThumbnailModel;
//# sourceMappingURL=videoThumbnail.model.js.map