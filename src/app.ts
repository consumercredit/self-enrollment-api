import { TYPES } from 'tedious';
import dotenv from 'dotenv';
import knex from 'knex';
import express from 'express';
import cors from 'cors';
import referenceRoutes from './routes/reference';
import tableRoutes from './routes/tables';
import valueRoutes from './routes/values';
import pageRoutes from './routes/pages';
import debtRoutes from './routes/debt';
import navRoutes from './routes/navigation';
import userRoutes from './routes/users';
import { profileMiddleware } from './middleware/profile-middleware';

dotenv.config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_server = process.env.DB_SERVER;
const db_name = process.env.DB_NAME;

export const db = knex({
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
  origin: [
    'http://localhost:5173',
    'https://myplan.consumercredit.com',
    'https://accc-self-enrollment-grarhubebjanhmeb.eastus-01.azurewebsites.net'
  ],
  credentials: true // Optional: only if you're sending cookies or auth headers
}));

// Apply profile middleware to all routes except users (which handles its own ProfileID logic)
app.use('/pages', profileMiddleware);
app.use('/nav', profileMiddleware);
app.use('/debt', profileMiddleware);
app.use('/tables', profileMiddleware);
app.use('/values', profileMiddleware);

app.use('/ref', referenceRoutes);
app.use('/tables', tableRoutes);
app.use('/values', valueRoutes);
app.use('/pages', pageRoutes);
app.use('/debt', debtRoutes);
app.use('/nav', navRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Self Enrollment API listening on port ${port}`);
});