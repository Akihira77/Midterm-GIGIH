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
const userComment_model_1 = __importDefault(require("../../models/userComment.model"));
const base_service_1 = require("./base.service");
class UserCommentService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.SubmitComment = (input) => __awaiter(this, void 0, void 0, function* () {
            return this._model.create(input);
        });
        this.GetAllByProductId = (productId) => __awaiter(this, void 0, void 0, function* () {
            return this._model.find({ productId: productId });
        });
    }
}
exports.default = new UserCommentService(userComment_model_1.default);
//# sourceMappingURL=userComment.service.js.map