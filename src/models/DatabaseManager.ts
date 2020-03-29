import {Pool, PoolConnection, createPool} from "mariadb";
export class DatabaseManager {
    pool: Pool;
    constructor() {
        this.pool = createPool({
            host: "db",
            database: process.env.DATABASE_NAME,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            connectionLimit: 10
        });
    }

    // Asynchronous query executor with error handling
    async executeQuery(query: string, queryArgs: string[]): Promise<{success: boolean; data: any}> {
        let conn: PoolConnection | undefined = undefined;
        const response = {success: true, data: {}};
        try {
            conn = await this.pool.getConnection() as PoolConnection;
            const db_res = await conn.query(query, queryArgs);
            // Useless metadata we don't really care about
            delete db_res["meta"];
            response.data = db_res;
            return response;
        } catch (err) {
            console.error(err);
            response.success = false;
            return response;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }
}