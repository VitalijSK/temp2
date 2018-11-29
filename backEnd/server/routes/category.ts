import categoryControllers from '../controllers/CategoryRoutController'

const Router = require('router');

const router = Router();

router.get('/', categoryControllers.getAll);

router.post('/', categoryControllers.add);

router.put('/:id', categoryControllers.editById);

router.delete('/:id', categoryControllers.deleteById);

export default router;


