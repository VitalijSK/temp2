import { ICRUDModel } from '../interfaceRoute/ICRUDModel';
import Queries from '../database/query';

class MainFactory<T> implements ICRUDModel<T> {

    private table : string;
    constructor(table : string) {
      this.table = table;
    }
    getAll() {
        return Queries.getAll(this.table);
    }
    getById(id : string) {
        return Queries.getByProperty(this.table, 'id', id);
    }
    deleteById(id : string) {
        return Queries.deleteByProperty(this.table, 'id', id);
    }
    add(data : T) {
        return Queries.addValue(this.table, data);
    }
    editById(id : string, data : T) {
        return Queries.editById(this.table, id,  data);
    }
}
export default MainFactory;
