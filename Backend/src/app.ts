import express from "express";
import cors from "cors";
import productoRoutes from "./routes/producto.routes";
import ordenRoutes from "./routes/orden.routes";

// Creacion de la aplicacion Express
const app = express();

// Middleware para habilitar CORS en todas las rutas
app.use(cors());
// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Configuracion de las rutas de la API bajo el prefijo /api
app.use("/api", productoRoutes);
app.use("/api", ordenRoutes);

// Ruta principal que confirma que la API esta funcionando
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de productos" });
});

// Ruta de health check para verificar estado del servidor
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Exportacion de la aplicacion para ser usada en server.ts
export default app;