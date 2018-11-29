import MainFactory from './MainModel';
import { ICategory } from 'server/interfaceRoute/category';

class CategoryModel extends MainFactory<ICategory> {
    constructor() {
        super('category');
    }
}
export default new CategoryModel();