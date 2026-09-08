import express from "express";
import cors from "cors";
import productoRoutes from "./routes/producto.routes";

// Creación de la aplicación Express
const app = express();
const PORT = 3000;

// Middleware para habilitar CORS en todas las rutas
app.use(cors());
// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Configuración de las rutas de la API bajo el prefijo /api
app.use("/api", productoRoutes);

// Ruta principal que confirma que la API está funcionando
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de productos" });
});

// Inicio del servidor en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});