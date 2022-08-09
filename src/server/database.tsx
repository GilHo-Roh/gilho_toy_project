import {createPool, sql,} from 'slonik'

const pool = createPool('postgres://')


//sample example
pool.connect( async (connection) =>{
  await pool.query(sql`ELECT id FROM foo`)
})


