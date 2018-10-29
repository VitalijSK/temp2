
const languages = require('uuid/v4');

class LanguageModel {
    getPackages(lang) {
        return require(`../../../language/${lang}`);
    }
}
export default new LanguageModel();