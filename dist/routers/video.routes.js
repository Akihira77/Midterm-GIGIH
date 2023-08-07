"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VideoController = __importStar(require("../controllers/video.controller"));
const validatorObjectId_middleware_1 = __importDefault(require("../middleware/validatorObjectId.middleware"));
const VideoRoutes = (0, express_1.default)();
VideoRoutes.get("/", VideoController.GetAll);
VideoRoutes.get("/thumbnails", VideoController.GetAllThumbnail);
VideoRoutes.get("/thumbnails/:videoId", (0, validatorObjectId_middleware_1.default)("videoId"), VideoController.GetThumbnailFromVideo);
VideoRoutes.post("/", VideoController.Create);
VideoRoutes.post("/thumbnails/:videoId", (0, validatorObjectId_middleware_1.default)("videoId"), VideoController.AddThumbnail);
exports.default = VideoRoutes;
//# sourceMappingURL=video.routes.js.map