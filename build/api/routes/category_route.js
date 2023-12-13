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
exports.categoryroute = void 0;
const authorize_1 = __importDefault(require("../../middleware/authorize"));
const categoryroute = (_router, _categoryService) => {
    _router.post('/category/add', authorize_1.default, (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _categoryService.insertCategory(req.body);
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
    _router.get('/category/get', authorize_1.default, (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _categoryService.getCategory();
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
    _router.post('/category/update', authorize_1.default, (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _categoryService.updateCategory(req.body);
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
};
exports.categoryroute = categoryroute;
