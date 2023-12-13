import { IEntityResponse } from "../../entity/ICommon.entity";
import { Request, Response, NextFunction, Router } from "express";
import user_service from "../services/user_service";
import authorize from "../../middleware/authorize";

export const userrouter = (_router: Router, _userService: user_service) => {

    _router.post('/auth/register', async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _userService.registerUser(req.body);
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid request...!";
        }
        resp.status(200).json(respData);
    });

    _router.post('/auth/login', async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.body) {
            respData = await _userService.loginRequest(req.body);
        } else {
            respData.isSuccess = false;
            respData.message = "Invalid credentials...!";
        }
        resp.status(200).json(respData);
    });

    _router.post('/admin/getDashboard', authorize, async (req: Request, resp: Response, next: NextFunction) => {
        let respData: IEntityResponse = {} as IEntityResponse;
        if (req.headers['dbToken']) {
            respData = await _userService.getAdminDashboard(req.headers['dbToken'].toString());
        } else {
            respData.isSuccess = false;
            respData.message = "Error occured...!";
        }
        resp.status(200).json(respData);
    });

}