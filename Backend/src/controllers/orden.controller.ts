import { Request, Response } from "express";
import { pool } from "../config/database.config";

// Funcion que crea una nueva orden y sus items en la base de datos
export const crearOrden = async (req: Request, res: Response) => {
    const { items, total } = req.body;
    
    try {
        // Iniciar transaccion para garantizar integridad
        const client = await pool.connect();
        
        try {
            await client.query("BEGIN");
            
            // Insertar la orden principal
            const ordenResult = await client.query(
                "INSERT INTO ordenes (total, estado) VALUES ($1, $2) RETURNING *",
                [total, "completada"]
            );
            const ordenId = ordenResult.rows[0].id;
            
            // Insertar cada item de la orden
            for (const item of items) {
                await client.query(
                    "INSERT INTO items_orden (orden_id, producto_id, nombre_producto, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5, $6)",
                    [ordenId, item.id, item.nombre, item.cantidad, item.precio, item.precio * item.cantidad]
                );
            }
            
            await client.query("COMMIT");
            
            console.log("Orden creada exitosamente:", ordenId);
            res.status(201).json({ message: "Orden creada exitosamente", ordenId });
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error al crear orden:", error);
        res.status(500).json({ message: "Error al crear orden" });
    }
};

// Funcion que obtiene todas las ordenes registradas
export const obtenerOrdenes = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM ordenes ORDER BY fecha_creacion DESC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener ordenes:", error);
        res.status(500).json({ message: "Error al obtener ordenes" });
    }
};

// Funcion que obtiene los items de una orden especifica
export const obtenerItemsOrden = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query(
            "SELECT * FROM items_orden WHERE orden_id = $1",
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener items de orden:", error);
        res.status(500).json({ message: "Error al obtener items de orden" });
    }
};
