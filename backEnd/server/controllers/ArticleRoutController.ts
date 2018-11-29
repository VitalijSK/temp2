import {
  Request,
  Response
} from 'express';
import article from '../models/Article';
import MainControllers from './MainController';
import { IArticle } from 'server/interfaceRoute/article';

class ArticleController extends MainControllers<IArticle> {
    constructor() {
        super(article);
    }
    async getOffer(req: Request, res: Response) {
      const articles = await article.getOffer();
      res.end(JSON.stringify(articles));
    }
    async getReject(req: Request, res: Response) {
      const articles = await article.getReject();
      res.end(JSON.stringify(articles));
    }
    async getAll(req: Request, res: Response) {
      const articles = await article.getAll();
      res.end(JSON.stringify(articles));
    }
    async getById(req: Request, res: Response) {
      const articleTemp = await article.getById(req.params.id);
      res.end(JSON.stringify(articleTemp[0]));
    }
};
export default new ArticleController();
