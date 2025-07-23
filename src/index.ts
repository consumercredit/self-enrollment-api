import { TYPES } from 'tedious';
import dotenv from 'dotenv';
import knex from 'knex';
import express from 'express';
import cors from 'cors';

dotenv.config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
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

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Optional: only if you're sending cookies or auth headers
}));

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
});

app.post('/concerns-01-01', async (req, res) => {
  const { ReferralID, ReasonForContactID } = req.body;
  try {
    await db.raw('EXEC update_ClientContract @ClientID = ?, @ReferralID = ?', [10, ReferralID]);
    await db.raw('EXEC update_ClientSession @ClientID = ?, @ReasonForContactID = ?', [10, ReasonForContactID]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});


app.listen(port, () => {
  console.log(`Self Enrollment API listening on port ${port}`);
});