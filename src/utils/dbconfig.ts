import { Pool } from 'pg';

export const poolCallCenter = new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:p@ss7469Word@localhost:5432/callcenter',
    idleTimeoutMillis: 30000
});
