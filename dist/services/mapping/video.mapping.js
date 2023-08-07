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
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoMap = exports.thumbnailMap = void 0;
const thumbnailMap = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const videoThumbnailDtos = data.map((e) => {
        return { videoId: e.videoId, urlImage: e.urlImage };
    });
    return videoThumbnailDtos;
});
exports.thumbnailMap = thumbnailMap;
const videoMap = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const videoDtos = data.map((e) => {
        return { productId: e.productId, url: e.url };
    });
    return videoDtos;
});
exports.videoMap = videoMap;
//# sourceMappingURL=video.mapping.js.map