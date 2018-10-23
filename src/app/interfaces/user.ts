export default interface IUser {
    name : string;
    age: number;
    information ?: boolean;
    dateOfNextNotification ?: string;
    dateOfFirstLogin ?: string;
    dateOfBirth ?: string;
    prop ?: Array<string>;
  }