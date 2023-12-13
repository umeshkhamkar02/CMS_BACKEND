import db from '../../db/db-connection'
import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { IDashboard, ILoginRequest, IUser } from '../../entity/IUser.entity';
import { IEntityResponse } from '../../entity/ICommon.entity';
import { sign } from 'jsonwebtoken';


dotenv.config();


export default class user_service {

    async registerUser(registerObj: IUser): Promise<IEntityResponse> {
        let RespObj: IEntityResponse = {} as IEntityResponse;

        try {
            
            let query = "CALL USP_RegisterUser(?,?,?,?,?,?)";
            let hashedPassword = await bcrypt.hash(registerObj.password!, 8)

            const data = new Promise((resolve, reject) => {
                let sqlResp: IEntityResponse = {} as IEntityResponse;
                db.query(query, [registerObj.name,registerObj.contactNumber, registerObj.emailId, hashedPassword , 'false', 'user'], (error, result) => {
                    if (error) {
                        sqlResp.isSuccess = false;
                        sqlResp.message = error.message;
                    } else {
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

            await data.then((x: any) => {
                RespObj = x;
            });
            
        } catch (err: any) {
            RespObj.isSuccess = false;
            RespObj.message = err.Error;
        }
        
        return RespObj;
    }

    async loginRequest(loginReq: ILoginRequest): Promise<IEntityResponse> {
        let RespObj: IEntityResponse = {} as IEntityResponse;

        try {

                let UserInfo: IUser = await this.GetUserInfo(loginReq.username!);
                if (UserInfo) {
                    const isValid = bcrypt.compareSync(loginReq.password!, UserInfo.password!);

                    if (isValid) {

                        let query = "CALL USP_LoginRequest(?)";
                        const data = new Promise((resolve, reject) => {
                            let sqlResp: IEntityResponse = {} as IEntityResponse;

                            //Check for existing valid token.
                            //If exists, then expire current token & create new token

                            //db token expiry 30min && JWT token expiry 1 day.
                            db.query(query, [loginReq.username], (error, result) => {
                                if (error) {
                                    sqlResp.isSuccess = false;
                                    sqlResp.message = error.message;
                                } else {
                                    UserInfo.password = "";
                                    let dbTokenObj = JSON.parse(JSON.stringify(result[0][0]));
                                    UserInfo.dbToken = dbTokenObj.message;
                                    const jwtToken = sign({ result: UserInfo }, process.env.SALT!, {
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

                        await data.then((x: any) => {
                            RespObj = x;
                        });

                    } else {
                        RespObj.isSuccess = false;
                        RespObj.message = 'Invalid credentials...!';
                    }
                } else {
                    RespObj.isSuccess = false;
                    RespObj.message = 'Invalid credentials...!';
                }
            
        }
        catch (err: any) {
            RespObj.isSuccess = false;
            RespObj.message = err.Error;
        }

        return RespObj;
    }

    async GetUserInfo(username: string): Promise<IUser> {
        let respObj: IUser = {} as IUser;

        try {

            let query = "CALL USP_GetUserInfo(?)";

            const data = new Promise((resolve, reject) => {
                let sqlResp: IEntityResponse = {} as IEntityResponse;

                db.query(query, [username], (error, result) => {
                    if (error) {
                        sqlResp.isSuccess = false;
                        sqlResp.message = error.message;
                    } else {
                        let _resp = JSON.parse(JSON.stringify(result[0][0]));

                        if (_resp.isSuccess === 1) {
                            let userinfo: IUser = JSON.parse(_resp.message);
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

            await data.then((x: any) => {
                respObj = x.data;
            });

        } catch (err) {

        }

        return respObj;
    }

    async getAdminDashboard(dbToken: string): Promise<IEntityResponse> {
        let RespObj: IEntityResponse = {} as IEntityResponse;

        try {

            let query = "CALL USP_Admin_GetDashboard(?)";
            
            const data = new Promise((resolve, reject) => {
                let sqlResp: IEntityResponse = {} as IEntityResponse;
                db.query(query, [dbToken], (error, result) => {
                    if (error) {
                        sqlResp.isSuccess = false;
                        sqlResp.message = error.message;
                    } else {
                        let _resp = JSON.parse(JSON.stringify(result[0][0]));

                        if (_resp.isSuccess === 1) {
                            sqlResp.isSuccess = true;
                            let category: IDashboard[] = JSON.parse(_resp.message);
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

            await data.then((x: any) => {
                RespObj = x;
            });

        } catch (err: any) {
            RespObj.isSuccess = false;
            RespObj.message = err.Error;
        }

        return RespObj;
    }

}