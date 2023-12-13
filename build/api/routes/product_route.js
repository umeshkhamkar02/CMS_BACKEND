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
exports.productroute = void 0;
const db_connection_1 = __importDefault(require("../../db/db-connection"));
const productroute = (_router, _productService) => {
    _router.post('/product/add', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _productService.insertProduct(req.body);
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
    _router.get('/product/get', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _productService.getProduct();
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
    _router.post('/product/update', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _productService.updateProduct(req.body);
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
    _router.get('/getById/:id', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let respData = {};
        if (req.body) {
            respData = yield _productService.getProductById(Number(req.params.id));
        }
        else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    }));
    _router.delete('/delete/:id', (req, res, next) => {
        const id = req.params.id;
        var query = "delete from product where id =?";
        db_connection_1.default.query(query, [id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Product id does not found." });
                }
                return res.status(200).json({ message: "Product Deleted Successfully" });
            }
            else {
                return res.status(500).json(err);
            }
        });
    });
    _router.patch('/updateStatus', (req, res, next) => {
        let user = req.body;
        var query = "update product set status=? where id=?";
        db_connection_1.default.query(query, [user.status, user.id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Product id does not found" });
                }
                return res.status(200).json({ message: "Product Status Updated Successfully" });
            }
            else {
                return res.status(500).json(err);
            }
        });
    });
    _router.get('/getByCategory/:id', (req, res, next) => {
        const id = req.params.id;
        var query = "select id, name from product where categoryId=? and status='true'";
        db_connection_1.default.query(query, [id], (err, results) => {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                return res.status(500).json(err);
            }
        });
    });
};
exports.productroute = productroute;
