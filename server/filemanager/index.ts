import { IUser } from '../models/User';
import { pathToUsers } from '../constants';

interface IFileManager {
    pathToFile: string;
    data: Array < IUser >
}
class FileManager implements IFileManager {
    pathToFile: string;
    data: Array < IUser > ;
    constructor() {
        this.pathToFile = pathToUsers;
        this.data = require(pathToUsers);
    }
    getData() {
        return this.data;
    }
}


export default new FileManager();