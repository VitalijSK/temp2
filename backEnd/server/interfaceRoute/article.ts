import { IUser } from "./user";
import { IStatus } from "./status";
import { ICategory } from "./category";

export interface IArticle {
  id : string;
  title : string;
  body : string;
  user: IUser;
  status : IStatus;
  rating : string;
  category : ICategory;
  data : string;
}