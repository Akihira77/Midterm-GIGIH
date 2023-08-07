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
const UserController = __importStar(require("../controllers/user.controller"));
const validatorObjectId_middleware_1 = __importDefault(require("../middleware/validatorObjectId.middleware"));
const UserRoutes = (0, express_1.default)();
UserRoutes.get("/", UserController.GetAll);
UserRoutes.get("/:id", (0, validatorObjectId_middleware_1.default)("id"), UserController.GetById);
UserRoutes.post("/", UserController.Create);
UserRoutes.delete("/:id", (0, validatorObjectId_middleware_1.default)("id"), UserController.Delete);
UserRoutes.put("/:id", (0, validatorObjectId_middleware_1.default)("id"), UserController.Update);
UserRoutes.get("/comments/get-all", UserController.GetAllUserComments);
UserRoutes.get("/comments/get-comment-from-video/:videoId", (0, validatorObjectId_middleware_1.default)("videoId"), UserController.GetAllByVideoId);
UserRoutes.post("/comments/submit-comment/:videoId", (0, validatorObjectId_middleware_1.default)("videoId"), UserController.SubmitComment);
exports.default = UserRoutes;
//# sourceMappingURL=user.routes.js.map