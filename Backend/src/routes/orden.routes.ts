import { Router } from "express";
import { crearOrden, obtenerOrdenes, obtenerItemsOrden } from "../controllers/orden.controller";

// Creacion del router para manejar las rutas relacionadas con ordenes
const router = Router();

// Definicion de la ruta POST para crear una nueva orden
router.post("/ordenes", crearOrden);
// Definicion de la ruta GET para obtener todas las ordenes
router.get("/ordenes", obtenerOrdenes);
// Definicion de la ruta GET para obtener los items de una orden especifica
router.get("/ordenes/:id/items", obtenerItemsOrden);

// Exportacion del router para ser utilizado en el archivo principal
export default router;