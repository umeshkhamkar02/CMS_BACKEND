"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.category_service = exports.product_service = exports.user_service = void 0;
const user_service_1 = __importDefault(require("./user_service"));
exports.user_service = user_service_1.default;
const product_service_1 = __importDefault(require("./product_service"));
exports.product_service = product_service_1.default;
const category_service_1 = __importDefault(require("./category_service"));
exports.category_service = category_service_1.default;
