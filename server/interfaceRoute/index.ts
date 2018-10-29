import { IUser } from '../models/User';
export default interface IUserRequest {
    user : IUser;
    checkName : string;
    decoded : IUser;
}