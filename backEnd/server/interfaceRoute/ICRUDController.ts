import {
  Request,
  Response
} from 'express';

export interface ICRUDControllers {
  getAll(req: Request, res: Response) : Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  add(req: Request, res: Response): Promise<void>;
  editById(req: Request, res: Response): Promise<void>;
  deleteById(req: Request, res: Response): Promise<void>;
}