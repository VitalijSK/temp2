import userMiddleware from '../middelwares/apiWare';
import userMiddlewareAssec from '../middelwares/userWare';
import usersControllers from '../controllers/UserRoutController'
import languageControllers from '../controllers/LanguageControllers';
import * as bodyParser from 'body-parser';

const Router = require('router');
const cors = require('cors');

const jsonParser = bodyParser.json()

const router = Router();

router.use(cors());
router.use(jsonParser); 

router.get('/api/language/:lang', languageControllers.getLanguage);
router.get('/api/users/:id', usersControllers.getUserById);
router.get('/api/users', usersControllers.getUsers);

router.use(userMiddleware.extendReqUser, userMiddleware.errorHandler);

router.post('/api/users/checkUser', usersControllers.checkUser);
router.post('/api/users/checkName', usersControllers.checkName);
router.post('/api/users/getPassword', usersControllers.getPassword);
router.post('/api/users/', usersControllers.addUser);

router.put('/api/users/:id', usersControllers.editUserById);

router.delete('/api/users/:id', usersControllers.deleteUserById);

router.use(userMiddlewareAssec.extendReqUser, userMiddlewareAssec.errorHandler);
router.get('/api/profile', usersControllers.getUserAuth);
router.get('/api/users/checkAuthUser', usersControllers.checkAuthUser);

export default router;


