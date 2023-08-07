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
exports.BaseService = void 0;
class BaseService {
    constructor(_model) {
        this._model = _model;
        this.GetAll = (populate) => __awaiter(this, void 0, void 0, function* () {
            return yield this._model.find().populate(populate || []);
        });
        this.GetById = (id, populate) => __awaiter(this, void 0, void 0, function* () {
            return yield this._model.findById(id).populate(populate || []);
        });
        this.Create = (input) => __awaiter(this, void 0, void 0, function* () {
            return yield this._model.create(input);
        });
        this.Delete = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this._model.findByIdAndDelete(id);
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map