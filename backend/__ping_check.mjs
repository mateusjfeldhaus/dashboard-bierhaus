import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query('SELECT 1').then(() => { console.log('OK: Ping Neon OK'); pool.end(); }).catch(e => { console.error('FAIL: Ping falhou:', e.message); pool.end(); process.exit(1); });
