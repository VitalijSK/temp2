import users from '../models/Users';
import {
    Request,
    Response
} from 'express';
import IUserRequest from '../interfaceRoute';
import { secret } from '../constants';
const jwt = require('jsonwebtoken');

class UsersControllers {
    getUsers(req: Request, res: Response) {
        const arrUsers = users.getUsers();
        if (arrUsers) {
            return res.end(JSON.stringify(arrUsers));
        }
        return res.end('Empty');
    };
    checkAuthUser (req: Request & IUserRequest, res: Response) {
        if (req.decoded) {
            const { id } = req.decoded;
            const user = users.getUserById(id);
            return res.end(JSON.stringify(!(user === false)));
        }
        return res.end('can\'t access');
    }
    getUserAuth(req: Request & IUserRequest, res: Response) {
        if (req.decoded) {
            const { id } = req.decoded;
            const user = users.getUserById(id);
            return res.end(JSON.stringify(user));
        }
        return res.end('can\'t access');
    }
    getUserById(req: Request, res: Response) {
        const user = users.getUserById(req.params.id);
        if (user) {
            return res.end(JSON.stringify(user));
        }
        return res.end('This user is not found');
    };
    
    addUser(req: Request & IUserRequest, res: Response) {
        const user = users.addUser(req.user);
        if (user) {
            return res.end(JSON.stringify('User was added'));
        }
        return res.end('Something gone wrong');
    };
    checkName(req: Request & IUserRequest, res: Response) {
        setTimeout( () => {
            
            const name : string = req.checkName;
            const checkUserName = users.checkUserName(name);
            console.log(checkUserName)
            return res.end(JSON.stringify(checkUserName));
        }, 300);
    }
    checkUser(req: Request & IUserRequest, res: Response) {
        setTimeout(()=>{
            const {name, password} = req.user;
            
            const checkUser = users.checkUser(name, password);
            if (checkUser) {
                const timeLife = 24 * 60 * 60 ; // 24h
                const token = jwt.sign(checkUser, secret, {
                    expiresIn: timeLife
                });
                return res.end(JSON.stringify({token}));
                
            } else {
            return res.end('Name or password incorrect');
            }  
        }, 3000);  
    }
    getPassword(req: Request & IUserRequest, res: Response) {
        const name : string = req.checkName;
        const user = users.getUserByName(name);
        if (user) {
            const data =  user.password;
            return res.end(JSON.stringify(data));
        } else {
            return res.end('This is user not found');
        }
        
    }
    editUserById(req: Request & IUserRequest, res: Response) {
        const user = users.updateUserById(req.user);
        if (user) {
            return res.end(JSON.stringify(user));
        }
        return res.end('Something gone wrong');

    };
    deleteUserById(req: Request, res: Response) {
        const user = users.deleteUserById(req.params.id);
        if (user) {
            return res.end(JSON.stringify('User was deleted'));
        }
        return res.end('This user is not found');
    };
};
export default new UsersControllers();