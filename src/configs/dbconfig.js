import 'dotenv/config'

const DBConfig = {
    host: process.env.DB_HOST ?? '',
    port: process.env.DB_PORT ?? 5432,
    database: process.env.DB_DATABASE ?? '',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? ''
}

export default DBConfig;