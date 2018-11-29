import articleControllers from '../controllers/ArticleRoutController'

const Router = require('router');

const router = Router();
router.get('/reject', articleControllers.getReject);
router.get('/offer', articleControllers.getOffer);
router.get('/:id', articleControllers.getById);
router.get('/', articleControllers.getAll);

router.post('/', articleControllers.add);

router.put('/:id', articleControllers.editById);

router.delete('/:id', articleControllers.deleteById);

export default router;


