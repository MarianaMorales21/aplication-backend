import 'dotenv/config'
import pg from 'pg'
import { DB_user, DB_database, DB_host, DB_password, DB_port } from "../config.js";

const { Pool } = pg

const connectionString = `postgresql://${DB_user}:${DB_password}@${DB_host}:${DB_port}/${DB_database}`

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString
})

try {
    await db.query('SELECT NOW()')
    console.log('Connected to database')
} catch (error) {
    console.error('Error connecting to database:', error)

}