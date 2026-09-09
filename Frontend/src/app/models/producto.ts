// Interfaz que define la estructura de datos para el modelo Producto
export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    stock: number;
}