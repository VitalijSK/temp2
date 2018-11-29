import { host, user, password, database } from "../constants";
import * as mysql from 'mysql';

const db = mysql.createConnection({
  host,
  user,
  password,
  database
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

export default db;