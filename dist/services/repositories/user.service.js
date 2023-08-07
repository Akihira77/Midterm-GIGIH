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
const user_model_1 = __importDefault(require("../../models/user.model"));
const base_service_1 = require("./base.service");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.GetByName = (name) => __awaiter(this, void 0, void 0, function* () {
            return yield this._model.findOne({ username: name });
        });
        this.Update = (id, password) => __awaiter(this, void 0, void 0, function* () {
            return yield this._model.findByIdAndUpdate(id, {
                $set: { password: password },
            }, { returnDocument: "after" });
        });
    }
}
exports.default = new UserService(user_model_1.default);
//# sourceMappingURL=user.service.js.map