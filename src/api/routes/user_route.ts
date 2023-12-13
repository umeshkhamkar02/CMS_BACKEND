import { IEntityResponse } from "../../entity/ICommon.entity";
import { Request, Response, NextFunction, Router } from "express";
import user_service from "../services/user_service";

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

}