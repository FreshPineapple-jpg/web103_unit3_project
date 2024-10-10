import pg from 'pg'
import dotenv from 'dotenv'

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

dotenv.config({path: path.resolve(_dirname, '../.env')})

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
}

export const pool = new pg.Pool(config)
