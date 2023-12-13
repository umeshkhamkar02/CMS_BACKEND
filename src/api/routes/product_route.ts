import { IEntityResponse } from "../../entity/ICommon.entity";
import { Request, Response, NextFunction, Router } from "express";
import product_service from "../services/product_service";

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

    
}