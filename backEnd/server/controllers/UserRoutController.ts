import users from '../models/Users';
import {
    Request,
    Response
} from 'express';
import IUserRequest from '../interfaceRoute/index';
import { secret } from '../constants';
import MainControllers from './MainController';
import { IUser } from 'server/interfaceRoute/user';
const jwt = require('jsonwebtoken');

class UsersControllers extends MainControllers<IUser> {
    constructor() {
        super(users);
    }
    async checkAuthUser(req: Request & IUserRequest, res: Response) {
        if (req.decoded) {
            const { id } = req.decoded;
            const user = await users.getById(id);
            return res.end(JSON.stringify(user));
        }
        return res.end('can\'t access');
    }
    async getUserAuth(req: Request & IUserRequest, res: Response) {
        if (req.decoded) {
            const { id } = req.decoded;
            const user = await users.getById(id);
            return res.end(JSON.stringify(user[0]));
        }
        return res.end('can\'t access');
    }
    checkName(req: Request & IUserRequest, res: Response) {
        setTimeout(async () => {
            const name: string = req.checkName;
            const checkUserName = await users.checkUserName(name);
            return res.end(JSON.stringify(checkUserName));
        }, 300);
    }
    async checkUser(req: Request & IUserRequest, res: Response) {
        const { name, password } = req.body;

        const checkUser : IUser = await users.checkUser(name, password);
        if (checkUser) {
            const timeLife = 24 * 60 * 60; // 24h
            const token = jwt.sign(JSON.parse(JSON.stringify(checkUser)), secret, {
                expiresIn: timeLife
            });
            return res.end(JSON.stringify({ token }));

        } else {
            return res.end('Name or password incorrect');
        }
    }
    async getPassword(req: Request & IUserRequest, res: Response) {
        const name: string = req.checkName;
        const user = await users.getUserByName(name);
        if (user) {
            const data = user.password;
            return res.end(JSON.stringify(data));
        } else {
            return res.end('This is user not found');
        }

    }
};
export default new UsersControllers();