import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export default connectionString;