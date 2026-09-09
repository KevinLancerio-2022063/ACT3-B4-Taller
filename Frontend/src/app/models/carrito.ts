// Interfaz que representa un item dentro del carrito
export interface CarritoItem {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

// Interfaz que representa el resumen del carrito
export interface CarritoResumen {
    items: CarritoItem[];
    total: number;
    cantidadTotal: number;
}
