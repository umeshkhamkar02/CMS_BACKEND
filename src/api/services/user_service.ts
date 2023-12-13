import db from '../../db/db-connection'
import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { IUser } from '../../entity/IUser.entity';
import { IEntityResponse } from '../../entity/ICommon.entity';


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

}