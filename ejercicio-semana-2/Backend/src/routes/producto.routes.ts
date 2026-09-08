import { Router } from "express";
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from "../controllers/producto.controller";

// Creación del router para manejar las rutas relacionadas con productos
const router = Router();

// Definición de la ruta GET para obtener todos los productos
router.get("/productos", obtenerProductos);
// Definición de la ruta POST para crear un nuevo producto
router.post("/productos", agregarProducto);
// Definición de la ruta PUT para actualizar un producto existente
router.put("/productos/:id", actualizarProducto);
// Definición de la ruta DELETE para eliminar un producto
router.delete("/productos/:id", eliminarProducto);

// Exportación del router para ser utilizado en el archivo principal
export default router;