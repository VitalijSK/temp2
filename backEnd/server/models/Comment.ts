import MainFactory from './MainModel';
import { createQueryPromise } from '../database/query';
import { IComment } from 'server/interfaceRoute/comment';

class ArticleModel extends MainFactory<IComment> {
    constructor() {
        super('comment');
    }
    getById(id: string) {
      return createQueryPromise(`${sql}${id}`);
    }
    getAllById(id : string) {
        return createQueryPromise(`${sqlArticle}${id}`);
    }
}
export default new ArticleModel();

const sql = `SELECT comment.*, user.name AS username
FROM comment JOIN user ON comment.user_id = user.id 
WHERE comment.article_id = `;

const sqlArticle = `SELECT comment.id, comment.text AS body, comment.date, user.name AS username
FROM comment JOIN article ON comment.article_id = article.id 
JOIN user ON comment.user_id = user.id
WHERE comment.article_id = `;