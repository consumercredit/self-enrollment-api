import { TYPES } from 'tedious';
import dotenv from 'dotenv';
import knex from 'knex';
import express from 'express';

dotenv.config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_server = process.env.DB_SERVER;
const db_name = process.env.DB_NAME;

const db = knex({
  client: 'mssql',
  connection: {
    user: db_user,
    password: db_pass,
    server: db_server,
    database: db_name,
    options: {
      encrypt: true,
      trustServerCertificate: true,
      mapBinding: (value) => {
        // Bind all strings to varchar instead of nvarchar
        if (typeof value === 'string') {
          return {
            type: TYPES.VarChar,
            value,
          };
        }
        // Allow devs to pass tedious type at query time
        if (value != null && value.type) {
          return {
            type: value.type,
            value: value.value,
          };
        }
        // Undefined is returned; falling back to default mapping function
      },
    },
  },
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/test', async (req, res) => {
  try {
    const result = await db('ClientSession')
      .select('*')
      .orderBy('ClientID', 'desc')
      .limit(1);
    res.json(result[0] || {});
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
})

app.listen(port, () => {
  console.log(`Self Enrollment API listening on port ${port}`);
});

export default db;
