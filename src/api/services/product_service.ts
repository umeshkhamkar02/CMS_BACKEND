import db from '../../db/db-connection'
import dotenv from 'dotenv';
import { IEntityResponse } from '../../entity/ICommon.entity';
import { IProduct } from '../../entity/IProduct.entity';

dotenv.config();

export default class product_service {

    async insertProduct(ReqObj: IProduct): Promise<IEntityResponse> {
        let RespObj : IEntityResponse = {} as IEntityResponse;
   
        try {
           
           let query = "CALL USP_InsertProduct(?,?,?,?,?)";
   
           const data = new Promise((resolve, reject)=> {
               let sqlResp: IEntityResponse = {} as IEntityResponse;
               db.query(query, [ReqObj.name, ReqObj.CategoryId, ReqObj.Description, ReqObj.price, 'true'], (error, result) => {
   
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

     async updateProduct(ReqObj: IProduct): Promise<IEntityResponse> {
        let RespObj : IEntityResponse = {} as IEntityResponse;
    
        try {
           
           let query = "CALL USP_UpdateProduct(?,?,?,?,?)";
    
           const data = new Promise((resolve, reject)=> {
               let sqlResp: IEntityResponse = {} as IEntityResponse;
               db.query(query, [ReqObj.id,ReqObj.name,ReqObj.CategoryId,ReqObj.Description,ReqObj.price], (error, result) => {
    
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

     async getProduct(): Promise<IEntityResponse> {
        let RespObj: IEntityResponse = {} as IEntityResponse;
    
        try {
            
            let query = "CALL USP_GetProduct()";
    
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
                            let category : IProduct[] = JSON.parse(_resp.message);
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

     async getProductById(id: number): Promise<IEntityResponse> {
        let RespObj: IEntityResponse = {} as IEntityResponse;
    
        try {
            
            let query = "CALL USP_GetProductById(?)";
    
            const data = new Promise((resolve, reject) => {
                let sqlResp: IEntityResponse = {} as IEntityResponse;
    
                db.query(query,[id], (error, result) => {
                    if (error) {
                        sqlResp.isSuccess = false;
                        sqlResp.message = error.message;
                    } else {
                        let _resp = JSON.parse(JSON.stringify(result[0][0]));
    
                        if (_resp.isSuccess === 1) {
                            sqlResp.isSuccess = true;
                            let category : IProduct[] = JSON.parse(_resp.message);
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

}