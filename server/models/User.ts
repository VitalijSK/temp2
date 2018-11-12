export interface IUser {
    id ?: string ;
    name : string;
    password: string;
    role ?: number;
    age: number | string;
    information ?: string;
    dateOfNextNotification ?: string;
    dateOfFirstLogin ?: string;
    dateOfBirth ?: string;
}