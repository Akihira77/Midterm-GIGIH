"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("./product.model"));
const UserCommentSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: product_model_1.default,
    },
    comment: { type: String },
}, {
    timestamps: true,
});
const UserCommentModel = (0, mongoose_1.model)("UserComment", UserCommentSchema);
exports.default = UserCommentModel;
//# sourceMappingURL=userComment.model.js.map