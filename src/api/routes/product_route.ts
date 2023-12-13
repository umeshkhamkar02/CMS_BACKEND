import { IEntityResponse } from "../../entity/ICommon.entity";
import { Request, Response, NextFunction, Router } from "express";
import product_service from "../services/product_service";
import db from "../../db/db-connection";

export const productroute = (_router: Router, _productService: product_service) => {

    _router.post('/product/add', async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _productService.insertProduct(req.body);
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.get('/product/get', async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _productService.getProduct();
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.post('/product/update', async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _productService.updateProduct(req.body);
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.get('/getById/:id', async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _productService.getProductById(Number(req.params.id));
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.delete('/delete/:id',(req,res,next)=>{
        const id = req.params.id;
        var query = "delete from product where id =?";
        db.query(query,[id],(err, results)=>{
            if(!err){
                if(results.affectedRows == 0){
                    return res.status(404).json({message: "Product id does not found."});
                }
                return res.status(200).json({message:"Product Deleted Successfully"});
            }
            else{
                return res.status(500).json(err);
            }
        })
    })

    _router.patch('/updateStatus', (req,res,next)=>{
        let user = req.body;
        var query = "update product set status=? where id=?";
        db.query(query,[user.status, user.id],(err, results)=>{
            if(!err){
                if(results.affectedRows == 0){
                    return res.status(404).json({message: "Product id does not found"});
                }
                return res.status(200).json({message:"Product Status Updated Successfully"});
            }
            else{
                return res.status(500).json(err);
            }
        })
    })

    _router.get('/getByCategory/:id', (req, res, next)=>{
        const id = req.params.id;
        var query = "select id, name from product where categoryId=? and status='true'";
        db.query(query,[id],(err, results)=>{
            if(!err){
                return res.status(200).json(results);
            }
            else{
                return res.status(500).json(err);
            }
        })
    })

}