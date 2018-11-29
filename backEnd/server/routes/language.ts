import languageControllers from '../controllers/LanguageControllers';

const Router = require('router');

const router = Router();

router.get('/:lang', languageControllers.getLanguage);

export default router;


