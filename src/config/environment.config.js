import dotenv from "dotenv"

dotenv.config()

const ENVIRONMENT = {
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    PORT: process.env.PORT || 3000,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    URL_BACKEND: process.env.URL_BACKEND
}

export default ENVIRONMENT
