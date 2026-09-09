import app from "../app";
import { pool, testConnection } from "../config/database.config";

// Definición del puerto desde variables de entorno o valor por defecto
const PORT = process.env.PORT || 3000;

// Función asíncrona para iniciar el servidor con conexión a base de datos
async function startServer() {
    try {
        // Prueba de conexión a PostgreSQL antes de iniciar el servidor
        console.log("Conectando a PostgreSQL");
        await testConnection();
        
        // Inicio del servidor HTTP en el puerto configurado
        app.listen(PORT, () => {
            console.log("===========================================");
            console.log(`Servidor corriendo en puerto ${PORT}`);
            console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
            console.log(`URL: http://localhost:${PORT}`);
            console.log(`API Health: http://localhost:${PORT}/api/health`);
            console.log("===========================================");
        });
    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error);
        process.exit(1);
    }
}

// Manejo de señal SIGINT para cierre controlado (Ctrl+C)
process.on("SIGINT", async () => {
    console.log("Cerrando servidor");
    await pool.end();
    process.exit(0);
});

// Manejo de señal SIGTERM para cierre controlado
process.on("SIGTERM", async () => {
    console.log("Cerrando servidor");
    await pool.end();
    process.exit(0);
});

// Llamada a la función para iniciar el servidor
startServer();