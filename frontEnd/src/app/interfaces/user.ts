export interface IUser {
    id ?: string ;
    name : string;
    password : string;
    age : number | string;
    information ?: string;
    error ?: string;
    role ? : number;
  }