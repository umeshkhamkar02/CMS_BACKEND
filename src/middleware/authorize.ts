import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from "../db/db-connection";
import { IEntityResponse } from "../entity/ICommon.entity";
import { IUser } from "../entity/IUser.entity";
dotenv.config();

function authorize(req: Request, resp: Response, next: NextFunction) {
    //Token authentication
    let respData: IEntityResponse = {} as IEntityResponse;
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7);
        verify(token, process.env.SALT!, async (err, decode: any) => {
            if (err) {
                respData.isSuccess = false
                respData.message = "Invalid token...!"
                resp.status(401).json(respData);
            } else {
                let userProfile: IUser = {} as IUser;
                userProfile = JSON.parse(JSON.stringify(decode.result));

                //validate db token & if valid add 30 mins
                let query = "CALL USP_ValidateDBToken(?)";

                const data = new Promise((resolve, reject) => {
                    let sqlResp: IEntityResponse = {} as IEntityResponse;
                    db.query(query, [userProfile.dbToken], (error, result) => {
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
                    respData = x;
                });

                if (respData.isSuccess) {
                    req.headers['dbToken'] = userProfile.dbToken;
                    req.headers['dbUserId'] = userProfile.id?.toString();
                    next();
                } else {
                    resp.status(401).json(respData);
                }
            }
        })
    } else {
        respData.isSuccess = false
        respData.message = "Access denied..! unautorize user..!"
        resp.status(401).json(respData);
    }
}

export default authorize;