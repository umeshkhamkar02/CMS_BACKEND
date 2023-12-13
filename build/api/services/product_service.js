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
const db_connection_1 = __importDefault(require("../../db/db-connection"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class product_service {
    insertProduct(ReqObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let query = "CALL USP_InsertProduct(?,?,?,?,?)";
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, [ReqObj.name, ReqObj.CategoryId, ReqObj.Description, ReqObj.price, 'true'], (error, result) => {
                        if (error) {
                            sqlResp.isSuccess = false;
                            sqlResp.message = error.message;
                        }
                        else {
                            let _resp = JSON.parse(JSON.stringify(result[0][0]));
                            if (_resp.isSuccess === 1) {
                                sqlResp.isSuccess = true;
                                sqlResp.message = _resp.message;
                            }
                            else {
                                sqlResp.isSuccess = false;
                                sqlResp.message = _resp.message;
                            }
                        }
                        resolve(sqlResp);
                    });
                });
                yield data.then((x) => {
                    RespObj = x;
                });
            }
            catch (err) {
                RespObj.isSuccess = false;
                RespObj.message = err.Error;
            }
            return RespObj;
        });
    }
    updateProduct(ReqObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let query = "CALL USP_UpdateProduct(?,?,?,?,?)";
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, [ReqObj.id, ReqObj.name, ReqObj.CategoryId, ReqObj.Description, ReqObj.price], (error, result) => {
                        if (error) {
                            sqlResp.isSuccess = false;
                            sqlResp.message = error.message;
                        }
                        else {
                            let _resp = JSON.parse(JSON.stringify(result[0][0]));
                            if (_resp.isSuccess === 1) {
                                sqlResp.isSuccess = true;
                                sqlResp.message = _resp.message;
                            }
                            else {
                                sqlResp.isSuccess = false;
                                sqlResp.message = _resp.message;
                            }
                        }
                        resolve(sqlResp);
                    });
                });
                yield data.then((x) => {
                    RespObj = x;
                });
            }
            catch (err) {
                RespObj.isSuccess = false;
                RespObj.message = err.Error;
            }
            return RespObj;
        });
    }
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let query = "CALL USP_GetProduct()";
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, (error, result) => {
                        if (error) {
                            sqlResp.isSuccess = false;
                            sqlResp.message = error.message;
                        }
                        else {
                            let _resp = JSON.parse(JSON.stringify(result[0][0]));
                            if (_resp.isSuccess === 1) {
                                sqlResp.isSuccess = true;
                                let category = JSON.parse(_resp.message);
                                sqlResp.data = category;
                            }
                            else {
                                sqlResp.isSuccess = false;
                                sqlResp.message = _resp.message;
                            }
                        }
                        resolve(sqlResp);
                    });
                });
                yield data.then((x) => {
                    RespObj = x;
                });
            }
            catch (err) {
                RespObj.isSuccess = false;
                RespObj.message = err.Error;
            }
            return RespObj;
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let query = "CALL USP_GetProductById(?)";
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, [id], (error, result) => {
                        if (error) {
                            sqlResp.isSuccess = false;
                            sqlResp.message = error.message;
                        }
                        else {
                            let _resp = JSON.parse(JSON.stringify(result[0][0]));
                            if (_resp.isSuccess === 1) {
                                sqlResp.isSuccess = true;
                                let category = JSON.parse(_resp.message);
                                sqlResp.data = category;
                            }
                            else {
                                sqlResp.isSuccess = false;
                                sqlResp.message = _resp.message;
                            }
                        }
                        resolve(sqlResp);
                    });
                });
                yield data.then((x) => {
                    RespObj = x;
                });
            }
            catch (err) {
                RespObj.isSuccess = false;
                RespObj.message = err.Error;
            }
            return RespObj;
        });
    }
}
exports.default = product_service;
