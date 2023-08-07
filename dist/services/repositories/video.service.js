"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_model_1 = __importDefault(require("../../models/video.model"));
const base_service_1 = require("./base.service");
class VideoService extends base_service_1.BaseService {
}
exports.default = new VideoService(video_model_1.default);
//# sourceMappingURL=video.service.js.map