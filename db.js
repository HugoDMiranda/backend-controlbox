import { createPool } from "mysql2";
import {
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
} from "./config.js";

export const db = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});
