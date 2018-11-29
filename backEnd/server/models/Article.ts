import MainFactory from './MainModel';
import { IArticle } from 'server/interfaceRoute/article';
import { createQueryPromise } from '../database/query';

class ArticleModel extends MainFactory<IArticle> {
    constructor() {
        super('article');
    }
    getAll() {
      return createQueryPromise(`${sql} WHERE article.status_id = 3`);
    }
    getById(id : string) {
      return createQueryPromise(`${sql} WHERE article.id = ${id}`);
    }
    getOffer() {
      return createQueryPromise(`${sql} WHERE article.status_id = 1`);
    }
    getReject() {
      return createQueryPromise(`${sql} WHERE article.status_id = 2`);
    }
}
export default new ArticleModel();

const sql = `SELECT article.id, article.body , article.title, article.rating, article.date, 
user.id AS user_id, user.name AS user_name, 
status.id AS status_id, status.title AS status_title, 
category.id AS category_id, category.title AS category_title 
FROM article JOIN category ON article.category_id = category.id 
JOIN user ON article.user_id = user.id
JOIN status ON article.status_id = status.id`;