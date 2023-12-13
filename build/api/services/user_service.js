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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
class user_service {
    registerUser(registerObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let query = "CALL USP_RegisterUser(?,?,?,?,?,?)";
                let hashedPassword = yield bcrypt_1.default.hash(registerObj.password, 8);
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, [registerObj.name, registerObj.contactNumber, registerObj.emailId, hashedPassword, 'false', 'user'], (error, result) => {
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
    loginRequest(loginReq) {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let UserInfo = yield this.GetUserInfo(loginReq.username);
                if (UserInfo) {
                    const isValid = bcrypt_1.default.compareSync(loginReq.password, UserInfo.password);
                    if (isValid) {
                        let query = "CALL USP_LoginRequest(?)";
                        const data = new Promise((resolve, reject) => {
                            let sqlResp = {};
                            //Check for existing valid token.
                            //If exists, then expire current token & create new token
                            //db token expiry 30min && JWT token expiry 1 day.
                            db_connection_1.default.query(query, [loginReq.username], (error, result) => {
                                if (error) {
                                    sqlResp.isSuccess = false;
                                    sqlResp.message = error.message;
                                }
                                else {
                                    UserInfo.password = "";
                                    let dbTokenObj = JSON.parse(JSON.stringify(result[0][0]));
                                    UserInfo.dbToken = dbTokenObj.message;
                                    const jwtToken = (0, jsonwebtoken_1.sign)({ result: UserInfo }, process.env.SALT, {
                                        expiresIn: process.env.ExpiresIn
                                    });
                                    UserInfo.token = jwtToken;
                                    UserInfo.dbToken = "";
                                    sqlResp.isSuccess = true;
                                    sqlResp.message = "success";
                                    sqlResp.data = UserInfo;
                                }
                                resolve(sqlResp);
                            });
                        });
                        yield data.then((x) => {
                            RespObj = x;
                        });
                    }
                    else {
                        RespObj.isSuccess = false;
                        RespObj.message = 'Invalid credentials...!';
                    }
                }
                else {
                    RespObj.isSuccess = false;
                    RespObj.message = 'Invalid credentials...!';
                }
            }
            catch (err) {
                RespObj.isSuccess = false;
                RespObj.message = err.Error;
            }
            return RespObj;
        });
    }
    GetUserInfo(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let respObj = {};
            try {
                let query = "CALL USP_GetUserInfo(?)";
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, [username], (error, result) => {
                        if (error) {
                            sqlResp.isSuccess = false;
                            sqlResp.message = error.message;
                        }
                        else {
                            let _resp = JSON.parse(JSON.stringify(result[0][0]));
                            if (_resp.isSuccess === 1) {
                                let userinfo = JSON.parse(_resp.message);
                                sqlResp.isSuccess = true;
                                sqlResp.message = 'Success';
                                sqlResp.data = userinfo;
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
                    respObj = x.data;
                });
            }
            catch (err) {
            }
            return respObj;
        });
    }
    getAdminDashboard(dbToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let RespObj = {};
            try {
                let query = "CALL USP_Admin_GetDashboard(?)";
                const data = new Promise((resolve, reject) => {
                    let sqlResp = {};
                    db_connection_1.default.query(query, [dbToken], (error, result) => {
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
exports.default = user_service;
