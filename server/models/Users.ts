import { IUser } from './User';
import fileManager from '../filemanager';
const uuidv4 = require('uuid/v4');

class UsersModel {
    users: Array < IUser > ;
    constructor() {
        this.users = fileManager.getData();
    }
    getUsers() {
        return this.users.map(user => user);
    }
    getUserById(id: string) {
        const user = this.users.find(findById(id));
        if (user) {
            return user;
        }
        return false;
    }
    getUserByName(name: string) {
        const user = this.users.find(findByName(name));
        if (user) {
            return user;
        }
        return false;
    }
    updateUserById(user: IUser) {
        if (user) {
            const userIndex = this.users.findIndex(findById(user.id));
            if (userIndex >= 0) {
                this.users[userIndex] = user;
                return user;
            }
        }
        return false;
    }
    checkUserName(name: string) {
        const currectUser = this.users.findIndex(findByName(name));
        return currectUser >= 0;
    }
    checkUser(name: string, password: string) {
        const currectUser = this.users.find(findByName(name));
        if (!currectUser) {
            return false;
        }
        if (currectUser.password === password) {
            return currectUser;
        }
        return false;
    }
    addUser(user: IUser) {
        if (user) {
            user.id = this.getId();
            user.role = 1;
            this.users.push(user);
            return true;
        }
        return false;
    }
    deleteUserById(id: string) {
        if (this.isExistId(id)) {
            this.users = this.users.filter(filterById(id));
            return true;
        }
        return false;
    }
    isExistId(id: string) {
        const userIndex = this.users.findIndex(findById(id));
        return userIndex >= 0;
    }
    getId() {
        return uuidv4();
    }
}
const findById = (id : string) => {
    return user => user.id === id   
};
const filterById = (id : string) => {
    return user => user.id !== id   
};
const findByName = (name) => {
    return user => user.name === name  
};
export default new UsersModel();