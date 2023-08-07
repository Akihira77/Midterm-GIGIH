"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("./product.model"));
const VideoSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: product_model_1.default,
    },
    url: { type: String, required: true },
}, {
    timestamps: true,
});
const VideoModel = (0, mongoose_1.model)("Video", VideoSchema);
exports.default = VideoModel;
//# sourceMappingURL=video.model.js.map