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
exports.videoProductMap = exports.productMap = void 0;
const productMap = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const productDtos = data.map((e) => {
        return { title: e.title, price: e.price, url: e.url };
    });
    return productDtos;
});
exports.productMap = productMap;
const videoProductMap = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const videoProductDtos = data.map((e) => {
        return { id: e._id, title: e.title, price: e.price, url: e.url };
    });
    return videoProductDtos;
});
exports.videoProductMap = videoProductMap;
//# sourceMappingURL=product.mapping.js.map