import { IEntityResponse } from "../../entity/ICommon.entity";
import { Request, Response, NextFunction, Router } from "express";
import category_service from "../services/category_service";
import authorize from "../../middleware/authorize";

export const categoryroute = (_router : Router, _categoryService: category_service) => {

    _router.post('/category/add', authorize, async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _categoryService.insertCategory(req.body);
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.get('/category/get', authorize, async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _categoryService.getCategory();
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.post('/category/update', authorize, async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _categoryService.updateCategory(req.body);
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

}