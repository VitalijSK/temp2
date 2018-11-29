class LanguageModel {
    getPackages(lang) {
        return require(`../../language/${lang}`);
    }
}
export default new LanguageModel();