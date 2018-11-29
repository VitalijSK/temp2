import category from '../models/Category';
import MainControllers from './MainController';
import { ICategory } from 'server/interfaceRoute/category';

class CategoryController extends MainControllers<ICategory> {
    constructor() {
        super(category);
    }
};
export default new CategoryController();