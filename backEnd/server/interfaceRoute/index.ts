import { IUser } from '../interfaceRoute/user';
export default interface IUserRequest {
    data : IUser;
    checkName : string;
    decoded : IUser;
}