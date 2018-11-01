import { IUser } from '../models/User';
import {
    Request,
    Response,
    NextFunction
} from 'express';
import IUserRequest from '../interfaceRoute';

export default {
    extendReqUser: (req: Request & IUserRequest, res: Response, next: NextFunction) => {
        if (req.body !== undefined && req.body.name !== undefined
            && req.body.password !== undefined) {
            const newUser: IUser = req.body;
            if (!newUser) {
                next('Wrong data for model');
            } else {
                req.user = newUser;
                next();
            }
        } else if (req.body !== undefined && req.body.checkName !== undefined) {
            const { checkName } = req.body;
            req.checkName = checkName.trim();
            next();
        } else {
            next()
        }
    },
    errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => {
        next(err);
    }
};