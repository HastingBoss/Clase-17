import express from "express";
import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import authController from "./controllers/auth.controller.js";

const app = express();
const PORT = ENVIRONMENT.PORT || 3000;

// Parse JSON
app.use(express.json());

// Rutas
app.post("/api/auth/register", authController.register);

// Inicio servidor
await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
