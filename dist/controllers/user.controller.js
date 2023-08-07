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
exports.GetAllUserComments = exports.GetAllByVideoId = exports.SubmitComment = exports.Update = exports.Delete = exports.Create = exports.GetById = exports.GetAll = void 0;
const user_service_1 = __importDefault(require("../services/repositories/user.service"));
const user_mapping_1 = __importDefault(require("../services/mapping/user.mapping"));
const video_service_1 = __importDefault(require("../services/repositories/video.service"));
const userComment_service_1 = __importDefault(require("../services/repositories/userComment.service"));
const comment_mapping_1 = __importDefault(require("../services/mapping/comment.mapping"));
const GetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield user_service_1.default.GetAll();
        return res.status(200).send({ data: { users: yield (0, user_mapping_1.default)(results) } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.GetAll = GetAll;
const GetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.GetById(req.params.id);
        if (result == null) {
            return res.status(404).send({ message: "User does not exists" });
        }
        return res.status(200).send({ data: { user: result.username } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.GetById = GetById;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield user_service_1.default.GetByName(req.body.username);
        if (userExists != null) {
            return res.status(400).send({ message: "User is already exists" });
        }
        const user = yield user_service_1.default.Create(req.body);
        yield user.save();
        return res.status(201).send({ data: { user: user } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.Create = Create;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.Delete(req.params.id);
        if (user == null) {
            return res.status(404).send({ message: "User does not exists" });
        }
        return res.status(200).send({ user });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.Delete = Delete;
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.Update(req.params.id, req.body.password);
        if (user == null) {
            return res.status(404).send({ message: "User does not exists" });
        }
        return res
            .status(200)
            .send({
            data: { user: { username: user.username, password: user.password } },
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.Update = Update;
const SubmitComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_service_1.default.GetById(req.params.videoId);
        if (video == null) {
            return res.status(404).send({ message: "Video does not exists" });
        }
        if ((yield user_service_1.default.GetByName(req.body.username)) == null) {
            return res.status(404).send({ message: "User does not exists" });
        }
        const result = yield userComment_service_1.default.SubmitComment({
            productId: video.productId,
            username: req.body.username,
            comment: req.body.comment,
        });
        yield result.save();
        return res.status(200).send({ data: { userComments: result } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.SubmitComment = SubmitComment;
const GetAllByVideoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_service_1.default.GetById(req.params.videoId);
        if (video == null) {
            return res.status(404).send({ message: "Video does not exists" });
        }
        const comments = yield userComment_service_1.default.GetAllByProductId(video.productId);
        return res
            .status(200)
            .send({ data: { userComments: yield (0, comment_mapping_1.default)(comments) } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.GetAllByVideoId = GetAllByVideoId;
const GetAllUserComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield userComment_service_1.default.GetAll();
        return res
            .status(200)
            .send({ data: { userComments: yield (0, comment_mapping_1.default)(results) } });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: "something has happend", error: error });
    }
});
exports.GetAllUserComments = GetAllUserComments;
//# sourceMappingURL=user.controller.js.map