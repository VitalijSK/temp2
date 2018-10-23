import {
    Request,
    Response,
    NextFunction
} from 'express';
import IUserRequest from '../interfaceRoute';
import { secret } from '../constants';
const jwt = require('jsonwebtoken');

export default {
    extendReqUser: (req: Request & IUserRequest, res: Response, next: NextFunction) => {
        const token = (req.body && req.body.token) || ( req.query && req.query.token ) || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {      
              if (err) {
                return res.end('Failed to authenticate token.');    
              } else {
                req.decoded = decoded;    
                next();
              }
            });
        
          } else {
             return res.end('No token provided.');
          }
    },
    errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => {
        next(err);
    }
};