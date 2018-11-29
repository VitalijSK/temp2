import { IUser } from '../interfaceRoute/user';
import MainFactory from './MainModel';
import Queries from '../database/query';

class UsersModel extends MainFactory<IUser> {
    constructor() {
        super('user');
    }
    async getUserByName(name: string): Promise<IUser> {
        const user = await Queries.getByProperty('user', 'name', name);
        if (user.length > 0) {
            return user[0];
        }
        return null;
    }
    async checkUserName(name: string) {
        const currectUser = await Queries.getByProperty('user', 'name', name);
        if (currectUser.length > 0) {
            return true;
        } 
        return false;
    }
    async checkUser(name: string, password: string) {
        const currectUser = await Queries.getByProperty('user', 'name', name);
        if (currectUser[0].password === password) {
            return currectUser[0];
        }
        return false;
    }
}
export default new UsersModel();