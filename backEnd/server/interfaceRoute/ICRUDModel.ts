export interface ICRUDModel<T> {
  getAll() : Promise<T[]>;
  getById(id : string) : Promise<T>;
  add(data : any) : Promise<boolean>;
  editById(id : string, data : any) : Promise<boolean>;
  deleteById(id : string) : Promise<boolean>;
}