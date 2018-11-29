import * as bodyParser from 'body-parser';
import routerUser from './users';
import routerArticle from './article';
import routerLanguage from './language';
import routerComment from './comment';
import routerCategory from './category';

const Router = require('router');
const cors = require('cors');

const jsonParser = bodyParser.json()

const router = Router();

router.use(cors());
router.use(jsonParser); 

router.use('/api/users', routerUser);
router.use('/api/articles', routerArticle);
router.use('/api/language', routerLanguage);
router.use('/api/comments', routerComment);
router.use('/api/categories', routerCategory);

export default router;


