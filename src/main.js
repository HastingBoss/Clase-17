import express from "express";
import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = ENVIRONMENT.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);

await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
