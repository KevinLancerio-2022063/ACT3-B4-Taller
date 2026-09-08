import express from "express";
import cors from "cors";
import productoRoutes from "./routes/producto.routes";

// Creación de la aplicación Express
const app = express();

app.use(cors());
// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

app.use("/api", productoRoutes);

// Ruta principal que confirma que la API está funcionando
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de productos" });
});

// Ruta de health check para verificar estado del servidor
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Exportación de la aplicación para ser usada en server.ts
export default app;