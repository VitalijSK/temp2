import {
    Request,
    Response
} from 'express';
import { IDataRequest } from '../interfaceRoute/IDataRequest';
import { ICRUDControllers } from '../interfaceRoute/ICRUDController';
import { ICRUDModel } from '../interfaceRoute/ICRUDModel';

class MainControllers<T> implements ICRUDControllers {

    model: ICRUDModel<T>

    constructor(model: ICRUDModel<T>) {
        this.model = model;
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.editById = this.editById.bind(this);
        this.add = this.add.bind(this);
    }
    async getAll(req: Request, res: Response) {
        try {
            const result = await this.model.getAll();
            res.end(JSON.stringify(result));
        } catch {
            res.end(JSON.stringify([]));
        }
    };
    async getById(req: Request, res: Response) {
        try {
            const result = await this.model.getById(req.params.id);
            res.end(JSON.stringify(result[0]));
        } catch {
            res.end(JSON.stringify({}));
        }
    };
    async deleteById(req: Request, res: Response) {
        try {
            const result = await this.model.deleteById(req.params.id);
            res.end(JSON.stringify(result));
        } catch {
            res.end(JSON.stringify(false));
        }
    };
    async editById(req: Request & IDataRequest<T>, res: Response) {
        try {
            const result = await this.model.editById(req.params.id, req.body);
            if (result) {
                res.end(JSON.stringify(result));
            }
            res.end('False');
        } catch {
            res.end('False');
        }

    };
    async add(req: Request & IDataRequest<T>, res: Response) {
        try {
            const result = await this.model.add(req.body);
            if (result) {
                res.end(JSON.stringify(result));
            }
            res.end('False');
        } catch {
            res.end('False');
        }
    };
};
export default MainControllers;