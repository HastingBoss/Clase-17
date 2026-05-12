import dotenv from "dotenv"

// Cargar variables
dotenv.config()

// Variables entorno
const ENVIRONMENT = {
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    PORT: process.env.PORT || 3000
}

export default ENVIRONMENT
