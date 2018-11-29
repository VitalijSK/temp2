import userMiddleware from '../middelwares/apiWare';
import userMiddlewareAssec from '../middelwares/userWare';
import usersControllers from '../controllers/UserRoutController'

const Router = require('router');

const router = Router();

router.get('/getInfo/:id', usersControllers.getById);
router.get('/', usersControllers.getAll);

router.use(userMiddleware.extendReqUser, userMiddleware.errorHandler);

router.post('/checkUser', usersControllers.checkUser);
router.post('/checkName', usersControllers.checkName);
router.post('/getPassword', usersControllers.getPassword);
router.post('/', usersControllers.add);

router.put('/:id', usersControllers.editById);

router.delete('/:id', usersControllers.deleteById);

router.use(userMiddlewareAssec.extendReqUser, userMiddlewareAssec.errorHandler);
router.get('/profile', usersControllers.getUserAuth);
router.get('/checkAuthUser/', usersControllers.checkAuthUser);

export default router;


