import comment from '../models/Comment';
import {
    Request,
    Response
} from 'express';
import MainControllers from './MainController';
import { IComment } from 'server/interfaceRoute/comment';

class UsersControllers extends MainControllers<IComment> {
    constructor() {
        super(comment);
    }
    async getAllById(req: Request, res: Response) {
        const comments = await comment.getAllById(req.params.id);
        res.end(JSON.stringify(comments));
    }
    async add(req: Request, res: Response) {
        try {
            const result = await this.model.add(req.body);
            if (result) {
                res.end(JSON.stringify(req.body.article_id));
            }
            res.end('False');
        } catch {
            res.end('False');
        }
    };
};
export default new UsersControllers();