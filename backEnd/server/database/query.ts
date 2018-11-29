import db from '../database';

class Queries {
  getAll(table: string) {
    const sql = `SELECT * FROM ${table}`;
    return createQueryPromise(sql);
  }
  getByProperty(table: string, property : string, value : string) {
    const sql = `SELECT * FROM ${table} WHERE ${property} = '${value}'`;
    return createQueryPromise(sql);
  }
  deleteByProperty(table: string, property : string, value : string) {
    const sql = `DELETE FROM ${table} WHERE ${property} = '${value}'`;
    console.log(sql);
    return createQueryPromise(sql);
  }
  addValue(table: string, params) {
    const { key, value } = seperateKey(params);
    const sql = `INSERT INTO ${table} (${key}) VALUES (${value})`;
    return createQueryPromise(sql);
  }
  editById(table: string, id : string, params) {
    const sql = `UPDATE ${table} SET ${generateParams(params)} WHERE id = ${id}`;
    return createQueryPromise(sql);
  }
  
}
const seperateKey = (params) : {key : string, value : string} => {
  let key = '';
  let value = '';
  for (let par in params) {
    key += `${par},`;
    value += `'${params[par]}',`
  }
  key = key.slice(0, key.length-1);
  value = value.slice(0, value.length-1);
  return { key, value };
}
const generateParams = (params) => {
  let sql = '';
  for (let param in params) {
      sql += `${param} = '${params[param]}',`;
  }
  return sql.slice(0, sql.length-1);
}
export const createQueryPromise = (sql : string) : Promise<any> => {
  return new Promise((res, rej) => {
    db.query(sql, function (err, result) {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });
}
export default new Queries();