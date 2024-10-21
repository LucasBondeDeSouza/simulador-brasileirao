import pg from 'pg'
import env from 'dotenv'

env.config()

const { Pool } = pg

const db = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

export default db