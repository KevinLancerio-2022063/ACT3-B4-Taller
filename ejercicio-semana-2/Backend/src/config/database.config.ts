import { Pool, PoolConfig } from "pg";
import * as dotenv from "dotenv";

// Configuración de dotenv para leer variables del archivo .env
dotenv.config();

// Configuración del pool de conexiones con valores por defecto desde variables de entorno
const poolConfig: PoolConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME || "productos",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    min: parseInt(process.env.DB_POOL_MIN || "2", 10),
    max: parseInt(process.env.DB_POOL_MAX || "10", 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
};

// Creación del pool de conexiones a PostgreSQL
export const pool = new Pool(poolConfig);

// Evento que se ejecuta cuando se establece una nueva conexión
pool.on("connect", () => {
    console.log("Nueva conexión establecida con PostgreSQL");
});

// Evento que maneja errores inesperados en el pool de conexiones
pool.on("error", (err) => {
    console.error("Error inesperado en el pool de PostgreSQL:", err);
    process.exit(-1);
});

// Función para probar la conexión a la base de datos
export const testConnection = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT NOW()");
        console.log("Conexión exitosa a PostgreSQL");
        console.log("Fecha del servidor:", result.rows[0].now);
        client.release();
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error);
        throw error;
    }
};

// Función para cerrar el pool de conexiones de manera controlada
export const closePool = async (): Promise<void> => {
    await pool.end();
    console.log("Pool de conexiones cerrado");
};