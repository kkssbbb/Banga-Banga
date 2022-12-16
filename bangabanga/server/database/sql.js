const mysql = require('mysql2');
require('dotenv').config();



const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: process.env.AWS_MYSQL_URL,
    user: process.env.AWS_MYSQL_USER,
    database: process.env.AWS_MYSQL_DATABASE,
    password: process.env.AWS_MYSQL_PASSWORD,
    port:process.env.AWS_MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

const promisePool = pool.promise();

const sql = {

  getSections : async () => {
    const [rows] = await promisePool.query(`
    select * from testTable;
    `)
    return rows
  },

  createScectionName : async () => {
    const [colum] = await promisePool.query(
      `INSERT INTO sections (section_name,section_floor)
      VALUES
      ('한식',2),
      ('분식',2),
      ('사천식',3),
      ('일식',3),
      ('양식',3),
      ('카페',1),
      ('디저트',1);

      `
    )
    return colum
  },

  updateSectionName: async() =>{
     const updatedSectionName = await promisePool.query(
      `
      update sections
      set section_name = '승빈3' where section_id=3;`
     )
  }

}

module.exports = sql