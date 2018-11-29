import language from '../models/Language';
import {
    Request,
    Response
} from 'express';

class LanguageControllers {
    getLanguage(req: Request, res: Response) {
        const lang = req.params.lang;
        const packeges = language.getPackages(lang);
        if (packeges) {
            return res.end(JSON.stringify(packeges));
        }
        return res.end('Empty');
    };
};
export default new LanguageControllers();