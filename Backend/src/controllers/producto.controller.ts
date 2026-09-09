import { Request, Response } from "express";
import { pool } from "../config/database.config";

// Función que obtiene todos los productos desde la base de datos
export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM productos ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

// Función que agrega un nuevo producto a la base de datos
export const agregarProducto = async (req: Request, res: Response) => {
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    
    try {
        const result = await pool.query(
            "INSERT INTO productos (nombre, descripcion, precio, categoria, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, descripcion, precio, categoria, stock]
        );
        
        console.log("Producto agregado al backend:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ message: "Error al agregar producto" });
    }
};

// Función que actualiza un producto existente en la base de datos
export const actualizarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    
    try {
        const result = await pool.query(
            "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, categoria = $4, stock = $5 WHERE id = $6 RETURNING *",
            [nombre, descripcion, precio, categoria, stock, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        console.log("Producto actualizado:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
};

// Función que elimina un producto de la base de datos
export const eliminarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        console.log("Producto eliminado:", result.rows[0]);
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: "Error al eliminar producto" });
    }
};