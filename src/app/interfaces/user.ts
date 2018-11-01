export default interface IUser {
    id ?: string ;
    name : string;
    password: string;
    age: number | string;
    information ?: string;
    dateOfNextNotification ?: string;
    dateOfFirstLogin ?: string;
    dateOfBirth ?: string;
    error ?: string;
  }