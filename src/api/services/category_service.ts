import db from '../../db/db-connection'
import dotenv from 'dotenv';
import { IEntityResponse } from '../../entity/ICommon.entity';
import { ICategory } from '../../entity/ICategory.entity';

dotenv.config();


export default class category_service {

  async insertCategory(ReqObj: ICategory): Promise<IEntityResponse> {
     let RespObj : IEntityResponse = {} as IEntityResponse;

     try {
        
        let query = "CALL USP_InsertCategory(?)";

        const data = new Promise((resolve, reject)=> {
            let sqlResp: IEntityResponse = {} as IEntityResponse;
            db.query(query, [ReqObj.name], (error, result) => {

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
            })
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

  async getCategory(): Promise<IEntityResponse> {
    let RespObj: IEntityResponse = {} as IEntityResponse;

    try {
        
        let query = "CALL USP_GetCategory()";

        const data = new Promise((resolve, reject) => {
            let sqlResp: IEntityResponse = {} as IEntityResponse;

            db.query(query, (error, result) => {
                if (error) {
                    sqlResp.isSuccess = false;
                    sqlResp.message = error.message;
                } else {
                    let _resp = JSON.parse(JSON.stringify(result[0][0]));

                    if (_resp.isSuccess === 1) {
                        sqlResp.isSuccess = true;
                        let category : ICategory[] = JSON.parse(_resp.message);
                        sqlResp.data = category;
                    } else {
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

  async updateCategory(ReqObj: ICategory): Promise<IEntityResponse> {
    let RespObj : IEntityResponse = {} as IEntityResponse;

    try {
       
       let query = "CALL USP_UpdateCategory(?, ?)";

       const data = new Promise((resolve, reject)=> {
           let sqlResp: IEntityResponse = {} as IEntityResponse;
           db.query(query, [ReqObj.id,ReqObj.name], (error, result) => {

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
           })
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