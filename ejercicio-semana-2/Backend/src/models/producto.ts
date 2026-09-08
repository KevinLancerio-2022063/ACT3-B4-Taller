// Interfaz que define la estructura de datos de un producto
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    stock: number;
}